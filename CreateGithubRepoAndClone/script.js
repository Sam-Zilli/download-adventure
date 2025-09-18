let currentStep = 1;

function nextStep(stepNumber) {
    // Hide the current step
    document.getElementById(`step-${currentStep}`).classList.remove('active');
    
    // Show the next step
    currentStep = stepNumber;
    document.getElementById(`step-${currentStep}`).classList.add('active');
}

function showCompletion() {
    // Hide the last step
    document.getElementById(`step-${currentStep}`).classList.remove('active');
    
    // Show the completion message
    document.getElementById('completion').style.display = 'block';  // Show completion div
}

// Show the first step by default
document.getElementById('step-1').classList.add('active');
