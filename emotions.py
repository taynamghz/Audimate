//  This script analyzes a face in an image or video frame, detecting emotions, age, gender, race, and face region.
import cv2
from deepface import DeepFace
import pandas as pd
from collections import Counter

# Load video
video_path = '/Users/taynamghz./Downloads/Stranger Things Self Tape - Audition Class.mp4'
cap = cv2.VideoCapture(video_path)

frame_rate = cap.get(cv2.CAP_PROP_FPS)
frame_skip = int(frame_rate)  # analyze 1 frame per second

frame_id = 0
emotions = []

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    if frame_id % frame_skip == 0:
        try:
            analysis = DeepFace.analyze(frame, actions=['emotion'], enforce_detection=False)
            dominant_emotion = analysis[0]['dominant_emotion']
            emotions.append(dominant_emotion)
        except Exception as e:
            print(f"Error on frame {frame_id}: {e}")
    
    frame_id += 1

cap.release()

# Analyze emotions across the video
emotion_counter = Counter(emotions)
total = sum(emotion_counter.values())
dominant_emotion = emotion_counter.most_common(1)[0][0]
consistency = round(emotion_counter[dominant_emotion] / total, 2)

# Print summary
print("\n🎬 Audition Tape Emotion Summary:")
print(f"Dominant Emotion     : {dominant_emotion}")
print(f"Consistency (0-1)    : {consistency}")
print(f"Emotion Distribution :")
for emotion, count in emotion_counter.items():
    percentage = round((count / total) * 100, 2)
    print(f" - {emotion.ljust(10)}: {count} frames ({percentage}%)")
