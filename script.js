// Profile data structure
const profileData = {
    FacialAnalysis: {
        AgeGroup: ['Child', 'Teen', 'YoungAdult', 'MiddleAged', 'Senior'],
        FaceShape: ['Oval', 'Round', 'Square', 'Heart', 'Diamond'],
        SymmetryLevel: ['HighSymmetry', 'ModerateSymmetry', 'LowSymmetry'],
        FeatureProminence: ['HighCheekbones', 'StrongJawline', 'SoftJawline', 'PronouncedBrow'],
        SkinTone: ['Fair', 'Medium', 'Olive', 'Brown', 'Dark']
    },
    EmotionRecognition: {
        BasicEmotion: ['Happiness', 'Sadness', 'Anger', 'Fear', 'Surprise', 'Disgust', 'Neutral'],
        CompoundEmotion: ['Contempt', 'Embarrassment', 'Awe', 'Amusement'],
        Intensity: ['Subtle', 'Moderate', 'Intense'],
        TemporalPattern: ['Flash', 'Sustained', 'Evolving']
    },
    VoiceProfile: {
        ToneType: ['SoftSpoken', 'Commanding', 'Warm', 'Stern', 'Breathless'],
        PitchRange: ['Low', 'Mid', 'High'],
        RhythmPattern: ['Steady', 'Erratic', 'Hesitant', 'Staccato'],
        VolumeLevel: ['Whisper', 'Conversational', 'Projected', 'Shouted'],
        TimbreQuality: ['Bright', 'Dark', 'Nasal', 'Resonant']
    },
    VisualTags: {
        ApparentAgeStyle: ['Youthful', 'Mature', 'Aged'],
        WardrobeTag: ['Casual', 'Formal', 'Period — Historical', 'Futuristic'],
        Styling: ['Minimalist', 'Dramatic', 'Bohemian', 'Edgy'],
        Grooming: ['Clean‑shaven', 'Beard', 'Stubble', 'NaturalHair', 'StyledHair'],
        AccessoryPresence: ['Glasses', 'Hat', 'Jewelry', 'Props']
    },
    BodyLanguage: {
        PostureType: ['Upright', 'Slouched', 'LeaningForward', 'OpenChest'],
        GestureStyle: ['OpenGestures', 'ClosedGestures', 'EmphaticGestures'],
        MovementEnergy: ['Energetic', 'Reserved', 'Fluid'],
        SpatialUse: ['Centered', 'WideStance', 'ShiftingWeight'],
        EyeContactPattern: ['Direct', 'Averted', 'Flickering', 'Steady']
    }
};

// Store selected profile options
let selectedProfile = {};

// Store uploaded video names
let uploadedVideos = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    setupScriptUpload();
    setupFileUpload();
    setupNavigation();
});

// Setup navigation between pages
function setupNavigation() {
    const saveProfileBtn = document.getElementById('saveProfile');
    const editProfileBtn = document.getElementById('editProfile');
    const confirmProfileBtn = document.getElementById('confirmProfile');
    const startAnalysisBtn = document.getElementById('startAnalysis');
    const newAnalysisBtn = document.getElementById('newAnalysis');

    saveProfileBtn.addEventListener('click', () => {
        showPage('profile-review');
        buildProfileSummary();
    });

    editProfileBtn.addEventListener('click', () => {
        showPage('profile-builder');
    });

    confirmProfileBtn.addEventListener('click', () => {
        showPage('video-upload');
    });

    startAnalysisBtn.addEventListener('click', () => {
        showPage('processing');
        simulateProcessing();
    });

    newAnalysisBtn.addEventListener('click', () => {
        // Reset all state
        selectedProfile = {};
        uploadedVideos = [];
        
        // Clear the uploaded videos container
        const uploadedVideosContainer = document.getElementById('uploadedVideos');
        uploadedVideosContainer.innerHTML = '';
        
        // Reset the script upload area
        const scriptDropZone = document.getElementById('scriptDropZone');
        scriptDropZone.innerHTML = `
            <p>Drag and drop your script here</p>
            <p>or</p>
            <button class="upload-btn">Browse Files</button>
            <input type="file" id="scriptInput" accept=".txt,.pdf,.docx" style="display: none;">
        `;
        
        // Reset the analyze button
        const analyzeScriptBtn = document.getElementById('analyzeScript');
        analyzeScriptBtn.disabled = true;
        
        // Show the script upload page
        showPage('script-upload');
        
        // Reinitialize the script upload functionality
        setupScriptUpload();
    });
}

// Show specific page and hide others
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

// Setup script upload functionality
function setupScriptUpload() {
    const scriptDropZone = document.getElementById('scriptDropZone');
    const scriptInput = document.getElementById('scriptInput');
    const analyzeScriptBtn = document.getElementById('analyzeScript');
    const uploadBtn = scriptDropZone.querySelector('.upload-btn');
    
    // Handle drag and drop
    scriptDropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        scriptDropZone.classList.add('dragover');
    });
    
    scriptDropZone.addEventListener('dragleave', () => {
        scriptDropZone.classList.remove('dragover');
    });
    
    scriptDropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        scriptDropZone.classList.remove('dragover');
        handleScriptFile(e.dataTransfer.files[0]);
    });
    
    // Handle button click
    uploadBtn.addEventListener('click', () => {
        scriptInput.click();
    });
    
    scriptInput.addEventListener('change', () => {
        if (scriptInput.files.length > 0) {
            handleScriptFile(scriptInput.files[0]);
        }
    });
}

// Handle script file upload
function handleScriptFile(file) {
    const analyzeScriptBtn = document.getElementById('analyzeScript');
    const scriptDropZone = document.getElementById('scriptDropZone');
    const scriptInput = document.getElementById('scriptInput');
    
    if (file && (file.type === 'text/plain' || 
                 file.type === 'application/pdf' || 
                 file.name.endsWith('.docx'))) {
        // For demo purposes, we'll simulate script analysis
        scriptDropZone.innerHTML = `
            <p>Script uploaded: ${file.name}</p>
            <p>Click "Analyze Script" to continue</p>
        `;
        
        // Enable the analyze button
        analyzeScriptBtn.disabled = false;
        
        // Clear the file input to prevent multiple uploads
        scriptInput.value = '';
        
        // Store the file for analysis
        analyzeScriptBtn.onclick = () => {
            analyzeScript(file);
        };
    } else {
        alert('Please upload a valid script file (.txt, .pdf, or .docx)');
        // Clear the file input if invalid file type
        scriptInput.value = '';
    }
}

// Analyze script and pre-select profile options
function analyzeScript(file) {
    // For demo purposes, we'll simulate script analysis
    // In a real implementation, this would use NLP to analyze the script
    
    // Reset selected profile
    selectedProfile = {};
    
    // Simulate script analysis results
    // These would be determined by actual script analysis in a real implementation
    selectedProfile = {
        FacialAnalysis: {
            AgeGroup: 'YoungAdult',
            FaceShape: 'Oval',
            SymmetryLevel: 'HighSymmetry',
            FeatureProminence: 'HighCheekbones',
            SkinTone: 'Medium'
        },
        EmotionRecognition: {
            BasicEmotion: 'Happiness',
            CompoundEmotion: 'Amusement',
            Intensity: 'Moderate',
            TemporalPattern: 'Sustained'
        },
        VoiceProfile: {
            ToneType: 'Warm',
            PitchRange: 'Mid',
            RhythmPattern: 'Steady',
            VolumeLevel: 'Conversational',
            TimbreQuality: 'Resonant'
        },
        VisualTags: {
            ApparentAgeStyle: 'Youthful',
            WardrobeTag: 'Casual',
            Styling: 'Minimalist',
            Grooming: 'Clean‑shaven',
            AccessoryPresence: 'None'
        },
        BodyLanguage: {
            PostureType: 'Upright',
            GestureStyle: 'OpenGestures',
            MovementEnergy: 'Fluid',
            SpatialUse: 'Centered',
            EyeContactPattern: 'Direct'
        }
    };
    
    // Move to profile builder page
    showPage('profile-builder');
    buildProfileUI();
}

// Build the profile UI
function buildProfileUI() {
    const categoriesContainer = document.querySelector('.categories');
    categoriesContainer.innerHTML = '';
    
    Object.entries(profileData).forEach(([category, traits]) => {
        const categoryElement = document.createElement('div');
        categoryElement.className = 'category';
        categoryElement.innerHTML = `
            <h3>${formatCategoryName(category)}</h3>
        `;
        
        Object.entries(traits).forEach(([trait, options]) => {
            const traitGroup = document.createElement('div');
            traitGroup.className = 'trait-group';
            traitGroup.innerHTML = `
                <h4>${formatTraitName(trait)}</h4>
                <div class="options" data-category="${category}" data-trait="${trait}">
                    ${options.map(option => `
                        <div class="option ${isSelected(category, trait, option) ? 'selected' : ''}" 
                             data-value="${option}">
                            ${formatOptionName(option)}
                        </div>
                    `).join('')}
                </div>
            `;
            categoryElement.appendChild(traitGroup);
        });
        
        categoriesContainer.appendChild(categoryElement);
    });

    // Add click handlers for options
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', () => {
            const category = option.parentElement.dataset.category;
            const trait = option.parentElement.dataset.trait;
            const value = option.dataset.value;
            
            // Update selected profile
            if (!selectedProfile[category]) {
                selectedProfile[category] = {};
            }
            selectedProfile[category][trait] = value;
            
            // Update UI
            option.parentElement.querySelectorAll('.option').forEach(opt => {
                opt.classList.remove('selected');
            });
            option.classList.add('selected');
        });
    });
}

// Build profile summary for review
function buildProfileSummary() {
    const profileSummary = document.getElementById('profileSummary');
    profileSummary.innerHTML = '';
    
    Object.entries(selectedProfile).forEach(([category, traits]) => {
        const categoryElement = document.createElement('div');
        categoryElement.className = 'summary-category';
        categoryElement.innerHTML = `
            <h3>${formatCategoryName(category)}</h3>
            ${Object.entries(traits).map(([trait, value]) => `
                <div class="summary-trait">
                    <h4>${formatTraitName(trait)}</h4>
                    <div class="summary-value">${formatOptionName(value)}</div>
                </div>
            `).join('')}
        `;
        profileSummary.appendChild(categoryElement);
    });
}

// Setup file upload functionality
function setupFileUpload() {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const uploadBtn = dropZone.querySelector('.upload-btn');
    const startAnalysisBtn = document.getElementById('startAnalysis');
    
    // Handle drag and drop
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });
    
    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });
    
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        handleFiles(e.dataTransfer.files);
    });
    
    // Handle button click
    uploadBtn.addEventListener('click', () => {
        fileInput.click();
    });
    
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            handleFiles(fileInput.files);
        }
    });

    // Enable start analysis button when files are uploaded
    const uploadedVideosContainer = document.getElementById('uploadedVideos');
    const observer = new MutationObserver(() => {
        startAnalysisBtn.disabled = uploadedVideosContainer.children.length === 0;
    });
    observer.observe(uploadedVideosContainer, { childList: true });
}

// Handle uploaded files
function handleFiles(files) {
    const uploadedVideosContainer = document.getElementById('uploadedVideos');
    
    Array.from(files).forEach(file => {
        if (file.type.startsWith('video/')) {
            const videoCard = document.createElement('div');
            videoCard.className = 'video-card';
            videoCard.innerHTML = `
                <video controls>
                    <source src="${URL.createObjectURL(file)}" type="${file.type}">
                </video>
                <p>${file.name}</p>
            `;
            uploadedVideosContainer.appendChild(videoCard);
            
            // Store the video name
            uploadedVideos.push(file.name);
        }
    });
    
    // Clear the file input after handling
    const fileInput = document.getElementById('fileInput');
    fileInput.value = '';
}

// Simulate processing
function simulateProcessing() {
    const progressBar = document.getElementById('processingProgress');
    const progressText = document.getElementById('progressText');
    let progress = 0;
    
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                showPage('analysis-results');
                simulateAnalysis();
            }, 1000);
        }
        
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${Math.round(progress)}%`;
    }, 500);
}

// Simulate analysis results
function simulateAnalysis() {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';
    
    // Generate random match percentages for each category
    const results = uploadedVideos.map(videoName => {
        const categoryMatches = Object.keys(profileData).map(category => {
            const match = Math.floor(Math.random() * 100);
            return {
                category,
                match,
                details: Object.keys(profileData[category]).map(trait => ({
                    trait,
                    match: Math.floor(Math.random() * 100)
                }))
            };
        });
        
        // Calculate overall match as average of category matches
        const overallMatch = Math.round(
            categoryMatches.reduce((sum, cat) => sum + cat.match, 0) / categoryMatches.length
        );
        
        return {
            videoName,
            overallMatch,
            categoryMatches
        };
    });
    
    // Sort by overall match percentage
    results.sort((a, b) => b.overallMatch - a.overallMatch);
    
    // Create result cards
    results.forEach((result, index) => {
        const resultCard = document.createElement('div');
        resultCard.className = 'result-card';
        resultCard.innerHTML = `
            <h3>${result.videoName}</h3>
            <div class="match-percentage">Overall Match: ${result.overallMatch}%</div>
            ${result.categoryMatches.map(category => `
                <div class="category-match">
                    <h4>${formatCategoryName(category.category)}</h4>
                    <div class="progress-bar">
                        <div class="progress" style="width: ${category.match}%"></div>
                    </div>
                    <div class="trait-matches">
                        ${category.details.map(detail => `
                            <div class="trait-match">
                                <span class="trait-name">${formatTraitName(detail.trait)}</span>
                                <span class="trait-percentage">${detail.match}%</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        `;
        resultsContainer.appendChild(resultCard);
    });
    
    // Clear uploaded videos array for next analysis
    uploadedVideos = [];
}

// Helper functions for formatting
function formatCategoryName(category) {
    return category.replace(/([A-Z])/g, ' $1').trim();
}

function formatTraitName(trait) {
    return trait.replace(/([A-Z])/g, ' $1').trim();
}

function formatOptionName(option) {
    return option.replace(/([A-Z])/g, ' $1').trim();
}

function isSelected(category, trait, option) {
    return selectedProfile[category] && selectedProfile[category][trait] === option;
} 