import React from 'react';

const About: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-4xl font-bold text-center text-blue-600 mb-4">À Propos</h1>
            <p className="text-lg text-gray-700 mb-2">Bienvenue sur notre application !</p>
            <p className="text-lg text-gray-700 mb-2">Ceci est une page dédiée à vous donner plus d'informations sur notre projet.</p>
            <p className="text-lg text-gray-700">Nous nous engageons à fournir les meilleures fonctionnalités pour nos utilisateurs.</p>
        </div>
    );
};

export default About;
