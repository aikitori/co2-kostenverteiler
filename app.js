document.addEventListener("DOMContentLoaded", function () {
    // Get the input fields and result div
    const livingAreaInput = document.getElementById("living_area");
    const energyConsumptionInput = document.getElementById("energy_consumption");
    const conversionFactorInput = document.getElementById("conversion_factor");
    const co2CostInput = document.getElementById("co2_cost");
    const resultDiv = document.getElementById("result");

    // Default values
    const DEFAULT_CONVERSION_FACTOR = 0.233; // kg CO₂ per kWh
    const DEFAULT_CO2_COST = 30; // € per tonne CO₂
    const TONNE_TO_KG = 1000; // Conversion factor from tonnes to kilograms

    // Add event listeners for input changes
    [livingAreaInput, energyConsumptionInput, conversionFactorInput, co2CostInput].forEach(input => {
        input.addEventListener("input", calculateCO2Cost);
    });

    function calculateCO2Cost() {
        // Get input values
        const livingArea = parseFloat(livingAreaInput.value);
        const energyConsumption = parseFloat(energyConsumptionInput.value);
        const conversionFactor = parseFloat(conversionFactorInput.value) || DEFAULT_CONVERSION_FACTOR;
        const co2CostPerTonne = parseFloat(co2CostInput.value) || DEFAULT_CO2_COST;

        // Validate inputs
        if (isNaN(livingArea) || isNaN(energyConsumption) || livingArea <= 0 || energyConsumption <= 0 || conversionFactor <= 0 || co2CostPerTonne <= 0) {
            resultDiv.style.display = "none"; // Hide result if inputs are invalid
            return;
        }

        // Convert CO2 cost from €/tonne to €/kg
        const co2CostPerKg = co2CostPerTonne / TONNE_TO_KG;

        // Calculate total CO₂ emissions and per square meter value
        const totalCO2 = energyConsumption * conversionFactor; // in kg
        const co2PerSquareMeter = totalCO2 / livingArea;

        // Calculate value based on co2PerSquareMeter
        let valueMultiplier = 1.0;
        if (co2PerSquareMeter >= 12 && co2PerSquareMeter < 17) {
            valueMultiplier = 0.9;
        } else if (co2PerSquareMeter >= 17 && co2PerSquareMeter < 22) {
            valueMultiplier = 0.8;
        } else if (co2PerSquareMeter >= 22 && co2PerSquareMeter < 27) {
            valueMultiplier = 0.7;
        } else if (co2PerSquareMeter >= 27 && co2PerSquareMeter < 32) {
            valueMultiplier = 0.6;
        } else if (co2PerSquareMeter >= 32 && co2PerSquareMeter < 37) {
            valueMultiplier = 0.5;
        } else if (co2PerSquareMeter >= 37 && co2PerSquareMeter < 42) {
            valueMultiplier = 0.4;
        } else if (co2PerSquareMeter >= 42 && co2PerSquareMeter < 47) {
            valueMultiplier = 0.3;
        } else if (co2PerSquareMeter >= 47 && co2PerSquareMeter < 52) {
            valueMultiplier = 0.2;
        } else if (co2PerSquareMeter >= 52) {
            valueMultiplier = 0.05;
        }

        // Calculate total cost based on valueMultiplier
        const totalCost = totalCO2 * co2CostPerKg
        const totalCostvermieter = totalCost * valueMultiplier;
        const totalCostMieter = totalCost - totalCostvermieter;

        // Display the result
        resultDiv.style.display = "block";
        resultDiv.innerHTML = `
            Gesamte CO₂-Emissionen: ${totalCO2.toFixed(2)} kg<br>
            CO₂ pro m²: ${co2PerSquareMeter.toFixed(2)} kg/m²<br>
            Anteil Vermietende: ${(valueMultiplier * 100).toFixed(2)} %<br>
            Gesamtkosten: ${totalCost.toFixed(2)} €<br>
            Kostenanteil Mietende: ${totalCostMieter.toFixed(2)} €<br>
            Kostenanteil Vermietende: ${totalCostvermieter.toFixed(2)} €
        `;
    }
});
