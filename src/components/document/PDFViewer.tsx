import React, { useState, useEffect } from 'react';
import { FileText, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PDFViewerProps {
  fileUrl: string;
  title?: string;
  showToolbar?: boolean;
  height?: string;
  width?: string;
  className?: string;
}

/**
 * Composant pour afficher un PDF avec plusieurs méthodes de prévisualisation
 */
const PDFViewer: React.FC<PDFViewerProps> = ({
  fileUrl,
  title,
  showToolbar = true,
  height = '100%',
  width = '100%',
  className = '',
}) => {
  const [viewerMethod, setViewerMethod] = useState<'direct' | 'google' | 'fallback'>('direct');

  // Essayer d'abord la méthode directe, puis Google Docs Viewer si ça échoue
  useEffect(() => {
    const timer = setTimeout(() => {
      // Si après 3 secondes on est toujours en mode direct, essayer Google Docs Viewer
      if (viewerMethod === 'direct') {
        setViewerMethod('google');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [viewerMethod]);

  // URL pour la méthode directe
  const directPdfUrl = showToolbar
    ? `${fileUrl}#toolbar=1&navpanes=1&scrollbar=1`
    : `${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`;

  // URL pour Google Docs Viewer
  const googleDocsUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=true`;

  // Gérer l'erreur de chargement de l'iframe
  const handleIframeError = () => {
    if (viewerMethod === 'direct') {
      setViewerMethod('google');
    } else if (viewerMethod === 'google') {
      setViewerMethod('fallback');
    }
  };

  // Afficher une solution de secours si aucune méthode ne fonctionne
  if (viewerMethod === 'fallback') {
    return (
      <div
        style={{ height, width }}
        className={`${className} flex flex-col items-center justify-center bg-gray-100 p-4 rounded-md`}
      >
        <FileText className="h-16 w-16 text-red-500 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Prévisualisation non disponible
        </h3>
        <p className="text-gray-600 text-center mb-4">
          La prévisualisation du PDF n'a pas pu être chargée. Vous pouvez ouvrir le document dans un nouvel onglet ou le télécharger.
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => window.open(fileUrl, '_blank')}
            className="flex items-center"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Ouvrir dans un nouvel onglet
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height, width }} className={className}>
      <iframe
        src={viewerMethod === 'direct' ? directPdfUrl : googleDocsUrl}
        title={title || "PDF Viewer"}
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        allowFullScreen
        onError={handleIframeError}
      />
    </div>
  );
};

export default PDFViewer;
