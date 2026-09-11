import type { IdTokenClaims } from 'oidc-client-ts';
import type { LinidUser } from '../types/linidUser';
/**
 * State interface for the Linid User Store.
 */
interface LinidUserState {
    /** The current user information. */
    user: LinidUser;
    /** Flag indicating whether the user is authenticated. */
    isAuthenticated: boolean;
}
/**
 * Returns the Linid User Store instance.
 * @returns The Linid User Store instance.
 */
export declare const useLinidUserStore: () => import("pinia").Store<"LinidUserStore", LinidUserState, {}, {
    /**
     * Populates the store from the claims of an OIDC ID token.
     * Maps `sub` → username, `email`, `name` → fullName, `roles` → roles,
     * and flips `isAuthenticated` to true.
     * @param claims The decoded ID token claims provided by oidc-client-ts.
     */
    setUserFromClaims(claims: IdTokenClaims): void;
}>;
export {};
