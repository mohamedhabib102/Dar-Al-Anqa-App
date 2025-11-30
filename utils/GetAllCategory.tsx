import api from "./api";


export const fetchCategories = async () => {
    try {
        const response = await api.get("/api/Books/GetAllCateGory");
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}