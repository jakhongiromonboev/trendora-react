import axios from "axios";
import { serverApi } from "../lib/config";
import type { LoginInput, Member, MemberInput } from "../lib/types/member";

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
}

export default MemberService;
