import React from "react";
import { Document } from "@/types/document";
import DocumentCard from "./DocumentCard";
import { motion } from "framer-motion";

interface DocumentGridProps {
  documents: Document[];
  onView: (document: Document) => void;
  onDownload: (document: Document) => void;
  onEdit?: (document: Document) => void;
  onDelete?: (document: Document) => void;
  onViewStats?: (document: Document) => void;
  isAdmin?: boolean;
}

/**
 * Composant pour afficher une grille de documents avec animation
 */
const DocumentGrid: React.FC<DocumentGridProps> = ({
  documents,
  onView,
  onDownload,
  onEdit,
  onDelete,
  onViewStats,
  isAdmin = false,
}) => {
  // Animation pour l'apparition des cartes
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2 sm:gap-3 md:gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {documents.map((document) => (
        <motion.div key={document.id} variants={item} className="h-full">
          <DocumentCard
            document={document}
            onView={onView}
            onDownload={onDownload}
            onEdit={isAdmin ? onEdit : undefined}
            onDelete={isAdmin ? onDelete : undefined}
            onViewStats={isAdmin ? onViewStats : undefined}
            isAdmin={isAdmin}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default DocumentGrid;
