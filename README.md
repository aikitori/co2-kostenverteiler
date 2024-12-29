# CO2 - Kostenverteiler

This web application helps users to calculate and split CO₂ emissions and associated costs between landlords (Vermieter) and tenants (Mieter). It uses the energy consumption and living area to calculate the total CO₂ emissions and then determines the cost based on the CO₂ emissions per square meter. The results are displayed with a breakdown of the cost share between the landlord and tenant, as well as VAT and other cost factors.
Features

- CO₂ Emissions Calculation: Calculates the total CO₂ emissions based on the energy consumption (kWh) and living area (m²) using a predefined conversion factor.
- Cost Calculation: Based on the CO₂ emissions, the app calculates the total cost using a cost per tonne of CO₂ and displays the breakdown for landlord and tenant.
- VAT Calculation: Allows the user to enter the VAT rate (e.g., 19%) and calculates both the net (without VAT) and gross (with VAT) values for the total cost.
- Responsive Design: The layout adjusts to different screen sizes, providing a user-friendly experience on both mobile and desktop devices.

How It Works

- Enter Information:
    - Wohnfläche (m²): Enter the living area in square meters.
    - Energieverbrauch (kWh): Enter the total energy consumption in kWh.
    - kWh zu CO₂ Faktor: Enter the conversion factor to calculate the CO₂ emissions based on energy consumption.
    - CO₂ Kosten (€/Tonne): Enter the cost per tonne of CO₂ (default is 30€/Tonne).
    - Mehrwertsteuer (MwSt): Enter the VAT rate (default is 19%).

- Calculation:
    - The app calculates the total CO₂ emissions, CO₂ per square meter, and the cost per tenant and landlord.
    - The VAT is applied to the final cost, and the net and gross values are displayed.

- Display Results:
    - The results show the total CO₂ emissions, the cost split, and how much the tenant and landlord will need to pay.

## Installation

To run the website locally:

Clone the repository:

`git clone https://github.com/yourusername/co2-kostenverteiler.git`

Open the index.html file in your browser to start using the app.

## License

This project is licensed under the MIT License - see the LICENSE file for details.