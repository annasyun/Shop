import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  push,
  set,
  update,
  query,
  orderByChild,
  equalTo,
  get,
  remove,
} from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(); // provider를 구글로 설정
const database = getDatabase(app);

export function login() {
  signInWithPopup(auth, provider) // popup을 이용한 signup
    .catch(console.error);
}

export function logout() {
  signOut(auth).catch(console.error);
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}

async function adminUser(user) {
  return get(ref(database, "admins")).then((snapshot) => {
    if (snapshot.exists()) {
      const admins = snapshot.val();
      const isAdmin = admins.includes(user.uid);
      return { ...user, isAdmin };
    }
    return user;
  });
}

export async function getAllProducts() {
  try {
    const snapshot = await get(ref(database, "products"));
    const data = snapshot.val();
    if (data) {
      const products = Object.values(data);
      return products;
    } else {
      return [];
    }
  } catch (error) {
    throw new Error("Failed to fetch products");
  }
}

export async function getProductById(id) {
  try {
    const snapshot = await get(ref(database, "products"));
    const data = snapshot.val();
    if (data) {
      const products = Object.values(data);
      const product = products.find((product) => product.id === id);
      return product;
    } else {
      throw new Error("Product not found");
    }
  } catch (error) {
    throw new Error("Failed to fetch product");
  }
}

// export function addToCart(
//   productId,
//   productName,
//   imgUrl,
//   selectedOption,
//   price
// ) {
//   const cartItemRef = ref(database, "cartItems");
//   const newCartItemRef = push(cartItemRef);
//   const newCartItemKey = newCartItemRef.key;

//   const cartItemData = {
//     productId,
//     productName,
//     imgUrl,
//     selectedOption,
//     price,
//     // 추가적인 필드나 정보를 저장할 수 있습니다.
//   };

//   set(newCartItemRef, cartItemData);
// }

export async function getCart(userId) {
  return get(ref(database, `carts/${userId}`)).then((snapshot) => {
    const items = snapshot.val() || {};
    return Object.values(items);
  });
}

export async function addOrUpdateToCart(userId, product) {
  return set(ref(database, `carts/${userId}/${product.id}`), product);
}

export async function removeFromCart(userId, productId) {
  return remove(ref(database, `carts/${userId}/${productId}`));
}
