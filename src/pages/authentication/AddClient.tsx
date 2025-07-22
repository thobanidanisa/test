// src/pages/authentication/AddClient.tsx

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useLocation } from 'react-router-dom';

interface SocialWorker {
  id: number;
  name: string;
}

const suburbs = [
  "Armadale", "Chiawelo", "Chiawelo Extensions", "Comptonville",
  // ... include the full list from your existing code ...
  "Slovoville Ext.1", "Stesa", "Tladi", "Zola", "Zondi"
];

const substances = [
  "alcohol (🧪)", "dagga (🌿)", "benzene (🛢)", "CAT (💊)",
  "cocaine...ecstasy (🎉)", "inhalants (🔥)", "mandrax (💠)", "hookah pipes (🚬)"
];

const AddClient: React.FC = () => {
  const location = useLocation();

  // State hooks for form fields. Adjust or extend according to your actual requirements.
  const [clientName, setClientName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState('');
  const [suburb, setSuburb] = useState('');
  const [address, setAddress] = useState('');
  const [nextOfKinName, setNextOfKinName] = useState('');
  const [nextOfKinPhone, setNextOfKinPhone] = useState('');
  const [assignedWorker, setAssignedWorker] = useState<number | ''>('');
  const [availableWorkers, setAvailableWorkers] = useState<SocialWorker[]>([]);
  const [selectedSubstances, setSelectedSubstances] = useState<string[]>([]);
  const [fileNumber, setFileNumber] = useState('');
  const [errormessage, setErrormessage] = useState('');

  useEffect(() => {
    // Generate a file number when component mounts (or whenever you prefer)
    const timestamp = Date.now();
    setFileNumber(`FILE-${timestamp}`);

    // If social workers passed via location.state, use them; otherwise, fetch or set empty.
    if (location.state && (location.state as any).workers) {
      setAvailableWorkers((location.state as any).workers as SocialWorker[]);
    } else {
      // Example: fetch from API endpoint if available.
      // fetch('/api/socialworkers')
      //   .then(res => res.json())
      //   .then((data: SocialWorker[]) => setAvailableWorkers(data))
      //   .catch(err => console.error('Failed to load workers:', err));
    }
  }, [location.state]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrormessage('');

    // Basic required validation
    if (!clientName.trim() || age === '' || !gender || !suburb || !address.trim()) {
      setErrormessage('Please fill in all required fields (marked with *).');
      return;
    }

    // Construct payload. Adjust field names as your backend expects.
    const payload = {
      clientName: clientName.trim(),
      age,
      gender,
      suburb,
      address: address.trim(),
      nextOfKinName: nextOfKinName.trim(),
      nextOfKinPhone: nextOfKinPhone.trim(),
      assignedWorker: assignedWorker === '' ? null : assignedWorker,
      substances: selectedSubstances,
      fileNumber,
      // ...any other fields...
    };

    try {
      // Example API call:
      // const res = await fetch('/api/clients', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload),
      // });
      // if (!res.ok) throw new Error('Network response was not ok');
      // const data = await res.json();
      console.log('Submitting payload:', payload);

      // On success: reset form fields, generate new file number
      setClientName('');
      setAge('');
      setGender('');
      setSuburb('');
      setAddress('');
      setNextOfKinName('');
      setNextOfKinPhone('');
      setAssignedWorker('');
      setSelectedSubstances([]);
      setFileNumber(`FILE-${Date.now()}`);
      // Optionally navigate or show a success message
    } catch (error) {
      console.error(error);
      setErrormessage('Failed to add client. Please try again.');
    }
  };

  const handleSubstancesChange = (e: ChangeEvent<HTMLSelectElement>) => {
    // For multi-select: collect selected options
    const options = Array.from(e.target.selectedOptions).map(opt => opt.value);
    setSelectedSubstances(options);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add New Client</h2>
      <form id="client-form" onSubmit={handleSubmit}>
        {/* Client Name */}
        <div className="input-field">
          <label htmlFor="clientName">Client Name *</label>
          <input
            type="text"
            id="clientName"
            name="clientName"
            value={clientName}
            onChange={e => setClientName(e.target.value)}
            required
          />
        </div>

        {/* Age */}
        <div className="input-field">
          <label htmlFor="age">Age *</label>
          <input
            type="number"
            id="age"
            name="age"
            value={age}
            onChange={e => {
              const val = e.target.value;
              setAge(val === '' ? '' : parseInt(val, 10));
            }}
            required
            min={0}
          />
        </div>

        {/* Gender */}
        <div className="input-field">
          <label htmlFor="gender">Gender *</label>
          <select
            id="gender"
            name="gender"
            value={gender}
            onChange={e => setGender(e.target.value)}
            required
          >
            <option value="">Select gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Suburb */}
        <div className="input-field">
          <label htmlFor="suburb">Suburb *</label>
          <select
            id="suburb"
            name="suburb"
            value={suburb}
            onChange={e => setSuburb(e.target.value)}
            required
          >
            <option value="">Select suburb</option>
            {suburbs.map((s, idx) => (
              <option key={idx} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Address */}
        <div className="input-field">
          <label htmlFor="address">Address *</label>
          <textarea
            id="address"
            name="address"
            value={address}
            onChange={e => setAddress(e.target.value)}
            required
            rows={3}
          />
        </div>

        {/* Next of Kin Name */}
        <div className="input-field">
          <label htmlFor="nextOfKinName">Next of Kin Name</label>
          <input
            type="text"
            id="nextOfKinName"
            name="nextOfKinName"
            value={nextOfKinName}
            onChange={e => setNextOfKinName(e.target.value)}
          />
        </div>

        {/* Next of Kin Phone */}
        <div className="input-field">
          <label htmlFor="nextOfKinPhone">Next of Kin Phone</label>
          <input
            type="tel"
            id="nextOfKinPhone"
            name="nextOfKinPhone"
            value={nextOfKinPhone}
            onChange={e => setNextOfKinPhone(e.target.value)}
          />
        </div>

        {/* Assigned Social Worker */}
        <div className="input-field">
          <label htmlFor="assignedWorker">Assigned Social Worker</label>
          <select
            id="assignedWorker"
            name="assignedWorker"
            value={assignedWorker}
            onChange={e => {
              const val = e.target.value;
              setAssignedWorker(val === '' ? '' : parseInt(val, 10));
            }}
          >
            <option value="">Select worker (optional)</option>
            {availableWorkers.map(worker => (
              <option key={worker.id} value={worker.id}>{worker.name}</option>
            ))}
          </select>
        </div>

        {/* Substances (multi-select) */}
        <div className="input-field">
          <label htmlFor="substances">Substances (if applicable)</label>
          <select
            id="substances"
            name="substances"
            value={selectedSubstances}
            onChange={handleSubstancesChange}
            multiple
            size={Math.min(substances.length, 5)} // show up to 5 rows by default
          >
            {substances.map((sub, idx) => (
              <option key={idx} value={sub}>{sub}</option>
            ))}
          </select>
          <small className="helper-text">
            Hold Ctrl (Windows) / Cmd (Mac) to select multiple.
          </small>
        </div>

        {/* Generated File Number (read-only) */}
        <div className="input-field">
          <label htmlFor="fileNumber">Generated File Number</label>
          <input
            type="text"
            id="fileNumber"
            name="fileNumber"
            value={fileNumber}
            readOnly
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn-primary">Add Client</button>

        {/* Error Message */}
        {errormessage && (
          <div className="error-message" id="form-error">
            {errormessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default AddClient;
