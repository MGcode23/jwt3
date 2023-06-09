const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		token: sessionStorage.getItem("token") || null,
  
		message: null,
		demo: [
		  {
			title: "FIRST",
			background: "white",
			initial: "white",
		  },
		  {
			title: "SECOND",
			background: "white",
			initial: "white",
		  },
		],
	  },
	  actions: {
		registerUser: async (email, password) => {
		  const request = {
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			},
			body: JSON.stringify({
			  email: email,
			  password: password,
			}),
		  };
		  try {
			const response = await fetch(
			  `${process.env.BACKEND_URL}/api/user`,
			  request
			);
			console.log(response)
			if (!response.ok) {
			  alert("Error en el registro del usuario");
			}
			const data = await response.json();
			setStore({token : data.token})
			console.log(data);
			if (response.ok) return true;
		  } catch (error) {
			console.log(error);
			return false;
		  }
		},
  
		loginUser: async (email, password) => {
		  const store = getStore();
		  const request = {
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			},
			body: JSON.stringify({
			  email: email,
			  password: password,
			}),
		  };
  
		  try {
			const response = await fetch(
			  `${process.env.BACKEND_URL}/api/token`,
			  request
			);
			if (!response.ok) {
			  return false;
			}
			const data = await response.json();
			setStore({ token: data.access_token });
			sessionStorage.setItem("token", data.access_token);
			return true;
		  } catch (error) {
			console.log(error);
		  }
		},
  
		logoutUser: async () => {
		  setStore({ token: null });
		  sessionStorage.removeItem("token");
		},
  
		// Use getActions to call a function within a fuction
		exampleFunction: () => {
		  getActions().changeColor(0, "green");
		},
  
		// getMessage: async () => {
		//   try {
		//     // fetching data from the backend
		//     const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
		//     const data = await resp.json();
		//     setStore({ message: data.message });
		//     // don't forget to return something, that is how the async resolves
		//     return data;
		//   } catch (error) {
		//     console.log("Error loading message from backend", error);
		//   }
		// },
		changeColor: (index, color) => {
		  //get the store
		  const store = getStore();
  
		  //we have to loop the entire demo array to look for the respective index
		  //and change its color
		  const demo = store.demo.map((elm, i) => {
			if (i === index) elm.background = color;
			return elm;
		  });
  
		  //reset the global store
		  setStore({ demo: demo });
		},
	  },
	};
  };
  
  export default getState;
  