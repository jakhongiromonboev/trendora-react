import axios from "axios";
import { serverApi } from "../lib/config";
import type {
  LoginInput,
  Member,
  MemberInput,
  MemberUpdateInput,
} from "../lib/types/member";

class MemberService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async signup(input: MemberInput): Promise<Member> {
    try {
      const url = this.path + `/member/signup`;
      const result = await axios.post(url, input, { withCredentials: true });
      console.log("signup, result:", result);

      const member: Member = result.data.member;
      console.log("member:", member);
      localStorage.setItem("memberData", JSON.stringify(member));
      return member;
    } catch (err) {
      console.log("Error, signup");
      throw err;
    }
  }

  public async login(input: LoginInput): Promise<Member> {
    try {
      const url = this.path + `/member/login`;
      const result = await axios.post(url, input, { withCredentials: true });
      console.log("login, result:", result);

      const member: Member = result.data.member;
      console.log("member:", member);
      localStorage.setItem("memberData", JSON.stringify(member));

      return member;
    } catch (err) {
      console.timeLog("Error,login");
      throw err;
    }
  }

  public async logout(): Promise<boolean> {
    try {
      const url = this.path + `/member/logout`;
      const result = await axios.post(url, {}, { withCredentials: true });
      console.log("logout", result);

      localStorage.removeItem("memberData");
      return result.data.logout;
    } catch (err) {
      console.log("Error, logout", err);
      throw err;
    }
  }

  public async updateMember(input: MemberUpdateInput): Promise<Member> {
    try {
      const formData = new FormData();
      formData.append("memberNick", input.memberNick || "");
      formData.append("memberPhone", input.memberPhone || "");
      formData.append("memberEmail", input.memberEmail || "");
      formData.append("memberPassword", input.memberPassword || "");
      formData.append("memberAddress", input.memberAddress || "");
      formData.append("memberDesc", input.memberDesc || "");

      if (input.memberImage) {
        formData.append("memberImage", input.memberImage);
      }

      const result = await axios(`${this.path}/member/update`, {
        method: "POST",
        data: formData,
        withCredentials: true,
        headers: { "Content-type": "multipart/form-data" },
      });
      console.log("updateMember:", result);

      const member: Member = result.data;
      localStorage.setItem("memberData", JSON.stringify(member));

      return member;
    } catch (err) {
      console.log("Error, updateMember");
      throw err;
    }
  }
}

export default MemberService;
