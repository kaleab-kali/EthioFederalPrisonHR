import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

interface BreadcrumbProps {
  labels?: { [key: string]: string }; // Custom labels for specific paths
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ labels = {} }) => {
  const location = useLocation();
  const { employeeId } = useParams<{ employeeId: string }>();

  
  const pathParts = location.pathname.split('/').filter(Boolean);

  
  const getBreadcrumbLabel = (part: string) => {
    // If it's a dynamic part custom name will be added here
    if (part === employeeId) {
      return `${employeeId}`;
    }

    // Use custom labels if provided, otherwise default to the part itself
    return labels[part] || part.charAt(0).toUpperCase() + part.slice(1);
  };

  return (
    <nav className="text-gray-600 text-sm mb-4">
      <ul className="flex space-x-2">
        {pathParts.map((part, index) => {
          
          const isLast = index === pathParts.length - 1;
          const path = `/${pathParts.slice(0, index + 1).join('/')}`;
          const label = getBreadcrumbLabel(part);

          return (
            <li key={index}>
              {!isLast ? (
                <>
                  <Link to={path} className="hover:underline">
                    {label}
                  </Link>
                  <span className="mx-1">/</span>
                </>
              ) : (
                <span>{label}</span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
