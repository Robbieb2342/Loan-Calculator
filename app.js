// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){

    // Hide results
    document.getElementById('results').style.display = 'none';

    // Show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

// Calculate Results

function calculateResults(){
    console.log('Calculating...');
    // UI Vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');


    const principal = parseFloat(amount.value);
    const calcInterest = parseFloat(interest.value) / 100 / 12;
    const calcPayment = parseFloat(years.value) * 12;

    // Compute Monthly Payments

    const x = Math.pow(1 + calcInterest, calcPayment);
    const monthly = (principal * x * calcInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calcPayment).toFixed(2);
        totalInterest.value = ((monthly * calcPayment) - principal).toFixed(2);
        // Show results
        document.getElementById('results').style.display = 'block';

        // Hide loader
        document.getElementById('loading').style.display = 'none';
    } else {
        showError('Please check your numbers');
    }


}


// Show an error

function showError(error){

    // Hide results
    document.getElementById('results').style.display = 'none';

    // Hide loader
    document.getElementById('loading').style.display = 'none';

    const errorDiv = document.createElement('div');

    // Get elements

    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add class
    errorDiv.className = 'alert alert-danger';
    // Create text node

    errorDiv.appendChild(document.createTextNode(error));

    // Insert error above heading

    card.insertBefore(errorDiv, heading);

    // Clear error

    setTimeout(clearError, 2000);


}

function clearError() {
    document.querySelector('.alert').remove();
}