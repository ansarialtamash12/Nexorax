import { create } from "zustand";
import type { DirectMember } from "@/services/community.service";

interface PersonalTeamMember {
  uLvl?: number;
  Loginid?: string;
  SponsorId?: string;
  Name?: string;
  RegDate?: string;
  Email?: string;
  Mobile?: string;
  Urank?: string;
  status?: string;
  SubscriptionAmount?: number;
  SubscribeDate?: string;
  DeployDate?: string;
  TeamBusiness?: number;
  ActiveTeam?: number;
  totTeam?: number;
  CountryFlag?: string;
  CountryId?: number;
  Package?: number;
}

interface LeftRightDownlineMember {
  Name?: string;
  name?: string;
  loginid?: string;
  Mobile?: string;
  mobile?: string;
  SponserId?: string;
  sponserId?: string;
  RegDate?: string;
  regDate?: string;
  licneseAmount?: number;
  deployAmount?: number;
  leftLBuss?: number;
  rightRBuss?: number;
  introSide?: string;
}

function getNoDataMessage(payload: unknown): string | null {
  if (typeof payload !== "object" || payload === null || !("message" in payload)) {
    return null;
  }

  const message = payload.message;
  if (
    typeof message === "string" &&
    /no data|no records?|no downline|no members?|no users?/i.test(message)
  ) {
    return message;
  }

  return null;
}

interface CommunityState {
  directMemberData: DirectMember[];
  personalTeamData: PersonalTeamMember[];
  leftRightData: LeftRightDownlineMember[];
  loading: boolean;
  error: string | null;
  setDirectMemberData: (data: DirectMember[]) => void;
  setPersonalTeamData: (data: PersonalTeamMember[]) => void;
  setLeftRightData: (data: LeftRightDownlineMember[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearDirectMemberData: () => void;
  clearPersonalTeamData: () => void;
  clearLeftRightData: () => void;
  fetchLeftRightData: (params: { LoginId: string; side: string; FromDate: string; ToDate: string }) => Promise<void>;
}

export const useCommunityStore = create<CommunityState>((set) => ({
  directMemberData: [],
  personalTeamData: [],
  leftRightData: [],
  loading: false,
  error: null,
  setDirectMemberData: (data) => set({ directMemberData: data }),
  setPersonalTeamData: (data) => set({ personalTeamData: data }),
  setLeftRightData: (data) => set({ leftRightData: data }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearDirectMemberData: () => set({ directMemberData: [], error: null }),
  clearPersonalTeamData: () => set({ personalTeamData: [], error: null }),
  clearLeftRightData: () => set({ leftRightData: [], error: null }),
  fetchLeftRightData: async (params) => {
    set({ loading: true, error: null, leftRightData: [] });
    try {
      const response = await fetch("/api/Community/getLeftRightdownlineTeam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      const data = await response.json();

      if (!response.ok) {
        if (getNoDataMessage(data)) {
          set({ leftRightData: [], loading: false, error: null });
          return;
        }
        throw new Error(data.message || "Failed to fetch left/right downline data");
      }

      if (Array.isArray(data)) {
        set({ leftRightData: data, loading: false, error: null });
        return;
      }

      if (typeof data === "object" && data !== null) {
        if (getNoDataMessage(data)) {
          set({ leftRightData: [], loading: false, error: null });
          return;
        }

        if ("data" in data && Array.isArray(data.data)) {
          set({ leftRightData: data.data, loading: false, error: null });
          return;
        }

        if (
          "data" in data &&
          data.data === null &&
          (!("success" in data) || data.success !== false)
        ) {
          set({ leftRightData: [], loading: false, error: null });
          return;
        }
      }

      throw new Error("Unexpected response while fetching left/right downline data");
    } catch (error) {
      set({
        leftRightData: [],
        error: error instanceof Error ? error.message : "Failed to fetch left/right downline data",
        loading: false,
      });
    }
  },
}));
