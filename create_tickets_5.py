import subprocess

# --- SETTINGS ---
# Remember to change this to your team's correct GitHub username and repository name!
REPO = "Crowi-dev/salad-configuration"

# --- TICKET DATA ---
tickets = [
    {
        "title": "Task 5.1: Create Global AuthStore (Zustand)",
        "body": "**Goal:** Create a global store to manage the user session and JWT token.\n\n**Tech Spec:** Create `src/store/useAuthStore.ts`. The state needs `token` (string | null) and `userName` (string | null). Initialize them from `localStorage` so the session survives page refreshes. Add functions `login(token, userName)` and `logout()`."
    },
    {
        "title": "Task 5.2: Implement Login Logic in LoginModal",
        "body": "**Goal:** Connect the login form to the real authentication API.\n\n**Tech Spec:** First, add a `login(email, password)` function to your `src/services/api.ts` that makes a `POST` request to the backend auth endpoint. Then, in `LoginModal.tsx`, update the `handleLogin` function to use this API call. On success, save the returning `token` and `name` to the AuthStore and close the modal. Display a red error message if credentials are invalid."
    },
    {
        "title": "Task 5.3: Update Header for Authenticated Users",
        "body": "**Goal:** Show user-specific UI in the top bar after login.\n\n**Tech Spec:** In `Header.tsx`, read the `userName` from the global AuthStore. Use conditional rendering: If a user is logged in, hide the 'Login' button and show 'Hello, [name]' and a 'Logout' button. Clicking Logout should clear the store and localStorage."
    },
    {
        "title": "Task 5.4: Create PriceStore and Fetch Prices",
        "body": "**Goal:** Fetch the customer-specific price list using the JWT token.\n\n**Tech Spec:** First, add a `getPrices(token)` function to `src/services/api.ts`. **CRITICAL:** You must add the header `Authorization: Bearer <token>` to the request! Then, create `src/store/usePriceStore.ts` with a state `prices: PriceListItem[]` and a function `fetchPrices(token)` that calls your API service."
    },
    {
        "title": "Task 5.5: Dynamic Prices on Ingredient Cards",
        "body": "**Goal:** Show the real cost for each ingredient only when logged in.\n\n**Tech Spec:** In `IngredientCard.tsx`, read the `prices` array from the global PriceStore. Find the price where `item_id` matches the card's `ingredient.id`. If found, display the price (e.g., '+ 1.50 €'). If not logged in, show 'Login to see price'."
    },
    {
        "title": "Task 5.6: Total Price Calculation (SummaryBar)",
        "body": "**Goal:** Use .reduce() to calculate the total sum based on selected items and their dynamic prices.\n\n**Tech Spec:** In `SummaryBar.tsx`, read the `prices` list. Convert the `slots` record into an array of active ingredients (just like you did in Week 4 for the weight). Use `.reduce()` to loop through this selection, find the corresponding price for each item ID from the price list, and sum them up. Display the final total in the bottom bar."
    },
    {
        "title": "Task 5.7: Build the Save Recipe Modal UI",
        "body": "**Goal:** Create a modal for naming and saving the current salad configuration.\n\n**Tech Spec:** Create `src/components/SaveRecipeModal.tsx` using the reusable `<Modal>` component. It should have a form with an input for 'Recipe Name' and a checkbox for 'Make Public'. Bind these to local state."
    },
    {
        "title": "Task 5.8: POST Recipe to Database",
        "body": "**Goal:** Send the final salad configuration to the backend server.\n\n**Tech Spec:** In `src/services/api.ts`, add a `saveRecipe(token, recipeData)` function (a `POST` request with the Authorization header). In `SaveRecipeModal.tsx`, implement the submit logic. The body data must contain the recipe name, bowl ID, and an array of selected ingredient IDs (extracted from your active `slots` record)."
    },
    {
        "title": "Task 5.9: Success Feedback and Selection Reset",
        "body": "**Goal:** Provide feedback and clear the bowl after a successful save.\n\n**Tech Spec:** Once the API call in the previous task returns successfully, show a success message to the user (e.g., 'Recipe saved!'). Then, call the `useIngredientStore`'s `clearSelection()` function to empty the bowl for the next build."
    }
]

def create_issue(ticket):
    """Creates a single issue in GitHub via CLI."""
    cmd = [
        "gh", "issue", "create",
        "--repo", REPO,
        "--title", ticket["title"],
        "--body", ticket["body"]
    ]
    try:
        subprocess.run(cmd, capture_output=True, text=True, check=True)
        print(f"✅ Created: {ticket['title']}")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error in task {ticket['title']}: {e.stderr}")

def main():
    print(f"🚀 Starting Sprint 5 ticket import to repository: {REPO}\n")
    try:
        subprocess.run(["gh", "--version"], check=True, capture_output=True)
    except:
        print("❌ Error: GitHub CLI (gh) is not installed.")
        return

    for t in tickets:
        create_issue(t)

    print("\n🎉 Sprint 5 is now ready on the board! Happy coding!")

if __name__ == "__main__":
    main()