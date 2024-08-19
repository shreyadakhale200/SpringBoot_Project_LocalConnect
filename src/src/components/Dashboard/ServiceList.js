
import React, { useState } from 'react';
import './ServiceList.css'; // Ensure this path is correct based on your project structure
import electricianJpg from '../../Images/electrician.jpg';
import homeclearnerJpg from '../../Images/Homecleaner.jpg';
import carpenterJpg from '../../Images/Carpenter.jpg';
import acrepairJpg from '../../Images/Acrepair.jpg';
import washingmachienJpg from '../../Images/Washingmachine.jpg';
import barberJpg from '../../Images/Barber.jpg';
import carandbikeJpg from '../../Images/carandbike.jpg';
import clinicJpg from '../../Images/ClinicCompounder.jpg';

const services = [
  { name: "ELECTRICIAN SERVICE", image: electricianJpg, id:1},
  { name: "HOME CLEANER SERVICE", image: homeclearnerJpg ,id:2},
  { name: "CARPENTER SERVICE", image: carpenterJpg ,id:3},
  { name: "AC REPAIR SERVICE", image: acrepairJpg, id:4},
  { name: "WASHING MACHIEN SERVICE", image: washingmachienJpg ,id:5},
  { name: "BARBER SERVICE", image: barberJpg ,id:6},
  { name: "CAR AND BIKE SERVICE", image: carandbikeJpg ,id:7},
  { name: "CLINIC CARE", image: clinicJpg ,id:8},

  // Add more services as needed
];

const ServiceList = ({userId}) => {
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({ date: '', time: '' });


  const handleImageClick = (service) => {
    setSelectedService(service);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      user_id: userId,
      service: selectedService.id,
      date: formData.date,
      time: formData.time,
      duration: formData.duration
    };

    try {
      const response = await fetch('http://localhost:8080/api/v1/bookings/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log('Data sent successfully');
        // Reset form
        setSelectedService(null);
        setFormData({ date: '', time: '' });
      } else {
        console.error('Failed to send data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className="service-list-container">
        {services.map((service, index) => (
          <div key={index} className="service-card" onClick={() => handleImageClick(service)}>
            <img src={service.image} alt={service.name} />
            <div className="service-card-text">
              {service.name}
            </div>
          </div>
        ))}
      </div>

      {selectedService && (
        <div className="form-container">
          <form onSubmit={handleFormSubmit}>
            <h3>Schedule for {selectedService.name}</h3>
            <label>
              Date:
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Time:
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Duration:
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                required
              />
              </label>
            
            
            <button type="submit">Submit</button>
          </form>
          <button onClick={() => setSelectedService(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ServiceList;
