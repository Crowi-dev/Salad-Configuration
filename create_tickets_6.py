import subprocess

# --- SETTINGS ---
# Change to your team's GitHub repository
REPO = "Crowi-dev/salad-configuration"

# --- TICKET DATA (INVEST Format) ---
tickets = [
    # --- MANDATORY CORE TICKETS ---
    {
        "title": "Task 6.1: Update Interface & App Logo",
        "body": "**Value:** Matches real backend data and branding.\n\n**Goal:** Update the `Ingredient` interface and replace the logo.\n\n**Tech Spec:** Inspect the API response and add missing properties to `src/types/index.ts`. Download the real Fresse logo, place it in `src/assets`, and use it in `Header.tsx`.\n\n**Acceptance Criteria:**\n- No TS errors with new properties.\n- Logo is visible."
    },
    {
        "title": "Task 6.2: Refactor Base Ingredients API",
        "body": "**Value:** Cleaner architecture using the dedicated endpoint.\n\n**Goal:** Fetch and display bases from `/api/baseingredients`.\n\n**Tech Spec:** Create `getBaseIngredients()` in `api.ts`. Use a dedicated state in `Configurator.tsx` and pass it to `BaseSelection.tsx`. Remove the old `.filter()` logic.\n\n**Acceptance Criteria:**\n- Salad/Quark bases load correctly from the new API."
    },
    {
        "title": "Task 6.3: Dynamic Server-Side Filtering (useEffect)",
        "body": "**Value:** Performance/UX: only fetch relevant data for Salad vs. Quark.\n\n**Goal:** Update API calls to use `?type_id=` based on user selection.\n\n**Tech Spec:** Pass `typeId` to `getCategories` and `getBowls`. Add `baseType` to the `useEffect` dependency array in `Configurator.tsx`.\n\n**Acceptance Criteria:**\n- Switching between 'Salaatti' and 'Rahka' triggers specific network requests."
    },
    {
        "title": "Task 6.4: Smart Click-to-Add & Slot Logic (Store)",
        "body": "**Value:** Effortless way to add items to the next available spot.\n\n**Goal:** Update the store to use slots and find the first empty space automatically.\n\n**Tech Spec:** In `useIngredientStore.ts`, change your state to `slots: Record<string, Ingredient | null>`. In `addIngredient`, loop from 1 to `selectedBowl.slot_count` to find the first `null` key and assign the item there. Add a `clearSlot(slotId)` function.\n\n**Acceptance Criteria:**\n- Clicking an ingredient fills the next available slot automatically.\n- Does nothing if full."
    },
    {
        "title": "Task 6.5: Visual Bowl - Base Layer & Divider",
        "body": "**Value:** Visual feedback for the chosen base and physical bowl structure.\n\n**Goal:** Render the base salad and the compartment divider.\n\n**Tech Spec:** In `CenterBowl.tsx`, render the base's `image_url` using `absolute inset-0 z-10`. Check `selectedBowl.slot_count` and render the correct divider image (4 or 6 slots) at `z-20`.\n\n**Acceptance Criteria:**\n- Selecting a base updates the background. Divider lines match the slot count."
    },
    {
        "title": "Task 6.6: Visual Bowl - Render Ingredients & Removal",
        "body": "**Value:** WYSWYG: user sees ingredients in sectors and can remove them.\n\n**Goal:** Render selected items in their wedges and allow removal.\n\n**Tech Spec:** Map over the active `slots` in `CenterBowl.tsx`. For each item, render its `wedge_image_url` at `z-30`. Next to each image, add an 'X' button that calls `clearSlot(slotKey)`.\n\n**Acceptance Criteria:**\n- Ingredients appear perfectly in their wedges.\n- Clicking 'X' frees up the slot."
    },
    {
        "title": "Task 6.7: SummaryBar Update (Cart Sync)",
        "body": "**Value:** The checkout cart must accurately reflect the visual bowl.\n\n**Goal:** Sync cart logic with the new slot-based system.\n\n**Tech Spec:** In `SummaryBar.tsx`, calculate total weight and price based on active items in `slots`. Ensure the cart's 'remove' button also calls `clearSlot(slotKey)`.\n\n**Acceptance Criteria:**\n- Totals stay in perfect sync with the visual bowl."
    },
    {
        "title": "Task 6.8: UI Polish - Active States & Dietary Badges",
        "body": "**Value:** Professional user experience and clear visual feedback.\n\n**Goal:** Highlight active selections and add the diet legend.\n\n**Tech Spec:** Conditionally apply a green text/border class to the selected bowl in `BowlSelection.tsx` and selected base in `BaseSelection.tsx`. Add a static dietary legend (G, L, V) to the bottom of `IngredientSection.tsx`.\n\n**Acceptance Criteria:**\n- User clearly sees which bowl/base is active.\n- Dietary legend is visible."
    },
    {
        "title": "Task 6.9: Conditional Base Selection (Quark logic)",
        "body": "**Goal:** Prevent users from selecting a base salad when 'Rahka' (Quark) is selected.\n\n**Tech Spec:** In `Configurator.tsx`, read the `baseType` from the store. If `baseType === 2` (Quark), conditionally hide the `<BaseSelection />` component (the right panel), or disable its buttons and show a text like 'No base options for quark'."
    },
    {
        "title": "Task 6.10: UX Polish - API Loading Spinners",
        "body": "**Value:** Users need to know that data is being fetched, rather than seeing a blank screen.\n\n**Goal:** Add loading states while API calls are pending.\n\n**Tech Spec:** Add an `isLoading` state to `Configurator.tsx` that is true during the `useEffect` fetches. Display a simple CSS spinner or text 'Ladataan...' when true.\n\n**Acceptance Criteria:**\n- A loading indicator shows up during network delays."
    },
    {
        "title": "Task 6.11: Quality Assurance (Code Cleanup)",
        "body": "**Value:** Professional codebase standard.\n\n**Goal:** Clean up the codebase before deployment.\n\n**Tech Spec:** Search through your project and remove all `console.log` statements. Fix any remaining TypeScript warnings or `any` types.\n\n**Acceptance Criteria:**\n- The console is empty of debug messages.\n- `npm run build` passes without TypeScript errors."
    },
    {
        "title": "Task 6.12: Deployment",
        "body": "**Value:** Software isn't done until it's live for the users.\n\n**Goal:** Deploy the application to the web.\n\n**Tech Spec:** Connect your GitHub repository to Vercel, Netlify, or GitHub Pages and trigger a production build of the main branch.\n\n**Acceptance Criteria:**\n- The application is accessible via a public URL."
    },

    # --- BONUS LEVEL TICKETS ---
    {
        "title": "[BONUS] Task 6.B13: Drag & Drop - Draggable Cards",
        "body": "**Value:** Intuitive 'Build' experience by picking up items physically.\n\n**Goal:** Replace simple clicking with draggable cards.\n\n**Tech Spec:** Install `@dnd-kit/core`. In `IngredientCard.tsx`, use `useDraggable`. Apply transforms and `z-50` during active drag.\n\n**Acceptance Criteria:**\n- Ingredient cards can be dragged across the screen."
    },
    {
        "title": "[BONUS] Task 6.B14: Drag & Drop - Droppable Slots",
        "body": "**Value:** Precise control over where each ingredient is placed.\n\n**Goal:** Turn the visual grid cells into drop targets and handle the drop.\n\n**Tech Spec:** Create a transparent `BowlSlot.tsx` overlaying each wedge using `useDroppable`. Wrap the configurator in `<DndContext onDragEnd={handleDragEnd}>`. Bypass the 'find first empty' logic and assign the item exactly to `event.over.id`.\n\n**Acceptance Criteria:**\n- Bowl sectors highlight when hovering. Dropping an item forces it into that sector."
    },
    {
        "title": "[BONUS] Task 6.B15: Community Page - Fetch Recipes",
        "body": "**Value:** Social inspiration for users.\n\n**Goal:** Display shared recipes from other users.\n\n**Tech Spec:** Fetch `GET /api/recipes` in `Community.tsx` and render them in a visually appealing grid.\n\n**Acceptance Criteria:**\n- Users can view a list of public recipes from the backend."
    },
    {
        "title": "[BONUS] Task 6.B16: Community Page - Hydration",
        "body": "**Value:** Easy 'remixing' of existing configurations.\n\n**Goal:** Load a community recipe into the local configurator.\n\n**Tech Spec:** Create a `loadRecipe` action in the store. Add a 'Load to Bowl' button in `Community.tsx` that populates the local `slots` state and redirects to `/`.\n\n**Acceptance Criteria:**\n- Clicking 'Load' fully populates the visual bowl with the community recipe."
    },
    {
        "title": "[BONUS] Task 6.B17: Print CSS Receipt",
        "body": "**Value:** Provides a physical order confirmation.\n\n**Goal:** Style the print view for a clean receipt layout.\n\n**Tech Spec:** Use `print:hidden` to hide navigation/UI. Style the bowl and summary for a single-page print. Add a 'Print Receipt' button that calls `window.print()`.\n\n**Acceptance Criteria:**\n- Print preview shows only the recipe visual and the ingredient list."
    }
]

def create_issue(ticket):
    cmd = ["gh", "issue", "create", "--repo", REPO, "--title", ticket["title"], "--body", ticket["body"]]
    try:
        subprocess.run(cmd, check=True)
        print(f"✅ Created: {ticket['title']}")
    except Exception as e:
        print(f"❌ Error in {ticket['title']}: {e}")

def main():
    print(f"🚀 Importing Sprint 6 tickets to: {REPO}")
    for t in tickets: create_issue(t)
    print("\n🎉 Sprint 6 is ready!")

if __name__ == "__main__": main()