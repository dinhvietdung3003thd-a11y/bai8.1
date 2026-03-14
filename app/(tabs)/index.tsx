import React, { createContext, ReactNode, useContext, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type User = {
  name: string;
  email: string;
  role: string;
  bio: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Thông báo", "Vui lòng nhập đầy đủ email và mật khẩu");
      return;
    }

    // Tài khoản mẫu để test
    if (email === "hungnguyen@gmail.com" && password === "123456") {
      setUser({
        name: "Hung Nguyen",
        email: "hungnguyen@gmail.com",
        role: "Mobile developer",
        bio: "I have above 5 years of experience in native mobile apps development, now i am learning React Native",
      });
    } else {
      Alert.alert("Đăng nhập thất bại", "Email hoặc mật khẩu không đúng");
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

type FoodItem = {
  id: string;
  name: string;
  country: string;
  price: string;
  image: string;
};

const categories = [
  {
    id: "1",
    title: "Pizza",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
  },
  {
    id: "2",
    title: "Burgers",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
  },
  {
    id: "3",
    title: "Steak",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=400",
  },
];

const popularItems: FoodItem[] = [
  {
    id: "1",
    name: "Food 1",
    country: "Viet Nam",
    price: "1$",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
  },
  {
    id: "2",
    name: "Food 2",
    country: "Korea",
    price: "3$",
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400",
  },
  {
    id: "3",
    name: "Food 3",
    country: "Japan",
    price: "2$",
    image:
      "https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=400",
  },
  {
    id: "4",
    name: "Food 4",
    country: "Thailand",
    price: "4$",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
  },
];

const LoginScreen = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginBox}>
        <Text style={styles.title}>Sign In</Text>

        <Text style={styles.label}>Email ID</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email here!"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password here!"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text style={styles.forgotText}>For got password?</Text>

        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => login(email, password)}
        >
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>Or sign in with</Text>

        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialBtn}>
            <Text style={styles.googleText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.socialBtn, styles.facebookBtn]}>
            <Text style={styles.facebookText}>Facebook</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.signupText}>
          Not yet a member? <Text style={styles.signupLink}>Sign Up</Text>
        </Text>

        <Text style={styles.note}>
          Tài khoản test: hungnguyen@gmail.com / 123456
        </Text>
      </View>
    </SafeAreaView>
  );
};

const ExplorerScreen = () => {
  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.headerTitle}>Explorer</Text>

      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for meals or area"
        />
        <TouchableOpacity style={styles.searchBtn}>
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Top Categories</Text>
        <Text style={styles.filterText}>Filter</Text>
      </View>

      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.categoryCard}>
            <Image source={{ uri: item.image }} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{item.title}</Text>
          </View>
        )}
      />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Popular Items</Text>
        <Text style={styles.viewAll}>View all</Text>
      </View>

      {popularItems.map((item) => (
        <View key={item.id} style={styles.foodCard}>
          <Image source={{ uri: item.image }} style={styles.foodImage} />
          <View style={{ flex: 1 }}>
            <Text style={styles.foodName}>{item.name}</Text>
            <Text style={styles.foodCountry}>By {item.country}</Text>
          </View>
          <Text style={styles.foodPrice}>{item.price}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const AccountScreen = () => {
  const { user, logout } = useAuth();

  return (
    <View style={styles.screen}>
      <Text style={styles.headerTitle}>Account</Text>

      <View style={styles.accountTop} />

      <View style={styles.accountContent}>
        <Text style={styles.userName}>{user?.name}</Text>
        <Text style={styles.userRole}>{user?.role}</Text>
        <Text style={styles.userBio}>{user?.bio}</Text>

        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Text style={styles.logoutBtnText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const MainApp = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState<"Explorer" | "Account">("Explorer");

  if (!user) {
    return <LoginScreen />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        {tab === "Explorer" ? <ExplorerScreen /> : <AccountScreen />}

        <View style={styles.bottomTab}>
          <TouchableOpacity style={styles.tabItem} onPress={() => setTab("Explorer")}>
            <Text
              style={[
                styles.tabText,
                tab === "Explorer" && styles.activeTabText,
              ]}
            >
              Explorer
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabItem} onPress={() => setTab("Account")}>
            <Text
              style={[
                styles.tabText,
                tab === "Account" && styles.activeTabText,
              ]}
            >
              Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default function Index() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loginBox: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 30,
    color: "#222",
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: "#444",
    marginTop: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 8,
  },
  forgotText: {
    alignSelf: "flex-end",
    color: "#f5a000",
    marginTop: 4,
    marginBottom: 16,
    fontSize: 12,
  },
  signInButton: {
    backgroundColor: "#f5a000",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  signInButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  orText: {
    textAlign: "center",
    marginBottom: 14,
    color: "#555",
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  socialBtn: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  facebookBtn: {
    backgroundColor: "#3b5998",
  },
  googleText: {
    color: "#333",
    fontWeight: "600",
  },
  facebookText: {
    color: "#fff",
    fontWeight: "600",
  },
  signupText: {
    textAlign: "center",
    marginTop: 20,
    color: "#555",
  },
  signupLink: {
    color: "#f5a000",
    fontWeight: "700",
  },
  note: {
    textAlign: "center",
    marginTop: 20,
    color: "gray",
    fontSize: 12,
  },
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 16,
    color: "#222",
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  searchBtn: {
    marginLeft: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchIcon: {
    fontSize: 18,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },
  filterText: {
    color: "#f5a000",
    fontWeight: "600",
  },
  viewAll: {
    color: "#f5a000",
    fontWeight: "600",
  },
  categoryCard: {
    width: 110,
    marginRight: 12,
    alignItems: "center",
  },
  categoryImage: {
    width: 100,
    height: 70,
    borderRadius: 12,
    marginBottom: 6,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
  },
  foodCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fafafa",
    padding: 10,
    borderRadius: 12,
    marginBottom: 12,
  },
  foodImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 12,
  },
  foodName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
  },
  foodCountry: {
    color: "#666",
    marginTop: 4,
  },
  foodPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
  },
  accountTop: {
    height: 140,
    backgroundColor: "#16b4e9",
    borderRadius: 10,
    marginBottom: 30,
  },
  accountContent: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  userName: {
    fontSize: 30,
    fontWeight: "700",
    color: "#444",
    marginBottom: 8,
  },
  userRole: {
    color: "#16b4e9",
    fontWeight: "700",
    marginBottom: 14,
  },
  userBio: {
    textAlign: "center",
    color: "#666",
    lineHeight: 22,
    marginBottom: 30,
  },
  logoutBtn: {
    backgroundColor: "#f5a000",
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 8,
  },
  logoutBtnText: {
    color: "#fff",
    fontWeight: "700",
  },
  bottomTab: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
    paddingVertical: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
  },
  tabText: {
    fontSize: 15,
    color: "#888",
    fontWeight: "600",
  },
  activeTabText: {
    color: "#ff6f61",
  },
});