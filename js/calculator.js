document.addEventListener('DOMContentLoaded', function() {
    const calculatorForm = document.getElementById('calorie-calculator');
    const caloriesResult = document.getElementById('calories');
    
    if (calculatorForm) {
        calculatorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const weight = parseFloat(document.getElementById('weight').value);
            const activity = document.getElementById('activity').value;
            const intensity = document.getElementById('intensity').value;
            const duration = parseFloat(document.getElementById('duration').value);
            
            // Calculate calories burned
            const calories = calculateCaloriesBurned(weight, activity, intensity, duration);
            
            // Display result with animation
            animateCalorieCount(calories);
        });
    }
    
    // Function to calculate calories burned
    function calculateCaloriesBurned(weight, activity, intensity, duration) {
        // MET (Metabolic Equivalent of Task) values for different activities
        const metValues = {
            running: { low: 7, medium: 10, high: 12.5 },
            cycling: { low: 4, medium: 8, high: 12 },
            swimming: { low: 5, medium: 8.5, high: 11 },
            weight_training: { low: 3, medium: 5, high: 6 },
            yoga: { low: 2.5, medium: 4, high: 5.5 },
            hiit: { low: 6, medium: 9, high: 12 },
            walking: { low: 2.5, medium: 4, high: 5 },
            elliptical: { low: 4.5, medium: 7, high: 9 },
            stair_climbing: { low: 4, medium: 7, high: 10 },
            dancing: { low: 3.5, medium: 5.5, high: 7 }
        };
        
        // Get MET value for the selected activity and intensity
        const met = metValues[activity][intensity];
        
        // Calculate calories burned using the formula: calories = MET * weight (kg) * duration (hours)
        // Convert duration from minutes to hours
        const durationHours = duration / 60;
        
        // Formula: calories = MET * weight (kg) * duration (hours)
        const caloriesBurned = met * weight * durationHours;
        
        // Round to nearest whole number
        return Math.round(caloriesBurned);
    }
    
    // Function to animate the calorie count
    function animateCalorieCount(targetCalories) {
        // Get current displayed calories
        const currentCalories = parseInt(caloriesResult.textContent);
        
        // Calculate the increment for each step of the animation
        const increment = Math.ceil(Math.abs(targetCalories - currentCalories) / 50);
        
        // Start the animation
        let currentCount = currentCalories;
        const interval = setInterval(() => {
            if (currentCount < targetCalories) {
                currentCount = Math.min(currentCount + increment, targetCalories);
            } else if (currentCount > targetCalories) {
                currentCount = Math.max(currentCount - increment, targetCalories);
            }
            
            caloriesResult.textContent = currentCount;
            
            if (currentCount === targetCalories) {
                clearInterval(interval);
                
                // Add a highlight effect
                caloriesResult.parentElement.classList.add('highlight');
                setTimeout(() => {
                    caloriesResult.parentElement.classList.remove('highlight');
                }, 1000);
            }
        }, 10);
    }
});
