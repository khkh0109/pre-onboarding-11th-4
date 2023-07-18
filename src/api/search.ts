import axios from "axios";
import { SearchSuggestions } from "../types";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
});

export class SearchAPI {
  static #ENDPOINT = "sick";

  static async get(value: string): Promise<SearchSuggestions> {
    const response = await axiosInstance.get(`/${this.#ENDPOINT}`, {
      params: {
        q: value,
      },
    });
    return response.data;
  }
}
