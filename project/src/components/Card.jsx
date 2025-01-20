// src/components/Card.js
import React from 'react';

export default function Card({ title, children }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-2">
      {title && <h3 className="text-lg font-medium text-gray-800">{title}</h3>}
      {children}
    </div>
  );
}
