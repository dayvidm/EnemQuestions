import React from 'react';

interface AuthSessionStatusProps {
    status?: string; // Certifique-se de que é uma string
    className?: string;
    [key: string]: any; // Para outras propriedades adicionais
}

const AuthSessionStatus: React.FC<AuthSessionStatusProps> = ({ status, className = '', ...props }) => {
    if (status && typeof status !== 'string') {
        console.error("The 'status' prop must be a string.");
        return null;
    }

    return (
        <>
            {status && (
                <div className={`${className} font-medium text-sm text-green-600`} {...props}>
                    {status}
                </div>
            )}
        </>
    );
};

export default AuthSessionStatus;
