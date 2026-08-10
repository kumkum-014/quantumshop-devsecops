import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= GET WISHLIST =================

  const fetchWishlist = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setWishlistItems([]);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/wishlist",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(
          data.message || "Failed to fetch wishlist"
        );
        return;
      }

      const products = (data.wishlist || []).map(
        (item) => ({
          id: item.productId,
          name: item.name,
          price: item.price,
          emoji: item.emoji,
          category: item.category,
          rating: item.rating,
        })
      );

      setWishlistItems(products);

    } catch (error) {
      console.error(
        "Fetch wishlist error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // Load wishlist when provider starts
  useEffect(() => {
    fetchWishlist();
  }, []);


  // ================= ADD =================

  const addToWishlist = async (product) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to use wishlist.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/wishlist",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            product,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Failed to add to wishlist"
        );
        return;
      }

      const products = (data.wishlist || []).map(
        (item) => ({
          id: item.productId,
          name: item.name,
          price: item.price,
          emoji: item.emoji,
          category: item.category,
          rating: item.rating,
        })
      );

      setWishlistItems(products);

    } catch (error) {
      console.error(
        "Add wishlist error:",
        error
      );

      alert("Unable to connect to server.");
    }
  };


  // ================= REMOVE =================

  const removeFromWishlist = async (productId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/wishlist/${productId}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Failed to remove wishlist item"
        );
        return;
      }

      const products = (data.wishlist || []).map(
        (item) => ({
          id: item.productId,
          name: item.name,
          price: item.price,
          emoji: item.emoji,
          category: item.category,
          rating: item.rating,
        })
      );

      setWishlistItems(products);

    } catch (error) {
      console.error(
        "Remove wishlist error:",
        error
      );

      alert("Unable to connect to server.");
    }
  };


  // ================= CHECK =================

  const isInWishlist = (productId) => {
    return wishlistItems.some(
      (item) => item.id === productId
    );
  };


  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        loading,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}


export function useWishlist() {
  return useContext(WishlistContext);
}