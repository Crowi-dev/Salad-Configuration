import React, { useState } from "react";
import Modal from "./Modal";
import { useIngredientStore } from "../store/useIngredientStore";
import { useAuthStore } from "../store/useAuthStore";
import { saveRecipe } from "../services/api";

interface SaveRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SaveRecipeModal: React.FC<SaveRecipeModalProps> = ({ isOpen, onClose }) => {
  const [recipeName, setRecipeName] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const slots = useIngredientStore((state) => state.slots);
  const selectedBowl = useIngredientStore((state) => state.selectedBowl);
  const token = useAuthStore((state) => state.token);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError("You must be logged in to save a recipe.");
      return;
    }

    if (!selectedBowl) {
      setError("Please select a bowl first.");
      return;
    }

    // Extract ingredient IDs from active slots
    const ingredientIds = Object.values(slots)
      .filter((i): i is NonNullable<typeof i> => i !== null)
      .map((i) => i.id);

    try {
      setIsSaving(true);
      await saveRecipe(token, {
        name: recipeName,
        bowlId: selectedBowl.id,
        ingredientIds,
        is_public: isPublic,
      });
      setRecipeName("");
      setIsPublic(false);
      onClose();
    } catch (err) {
      setError("Failed to save recipe. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full max-w-md p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Tallenna resepti
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Recipe Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reseptin nimi
            </label>
            <input
              type="text"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#A2D135]"
              placeholder="Anna reseptille nimi..."
            />
          </div>

          {/* Make Public */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isPublic"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="w-4 h-4 accent-[#A2D135]"
            />
            <label htmlFor="isPublic" className="text-sm font-medium text-gray-700">
              Tee julkinen
            </label>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition"
            >
              Peruuta
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 bg-[#A2D135] text-black font-bold py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50"
            >
              {isSaving ? "Tallennetaan..." : "Tallenna"}
            </button>
          </div>

        </form>
      </div>
    </Modal>
  );
};

export default SaveRecipeModal;