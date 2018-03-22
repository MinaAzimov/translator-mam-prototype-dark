import {
	USER_ROLE_PA,
	USER_ROLE_PA_1,
	USER_ROLE_PA_2,
	USER_ROLE_MAM,
	USER_ROLE_MPM,
	USER_ROLE_MMC,
	USER_ROLE_DOPP,
	USER_ROLE_PPC

} from "../constants";

export function getRoleConfig(role) {
	switch (role) {
		case USER_ROLE_PA: {
			return {
				label: "Production Assistant"
			}
		}

		case USER_ROLE_PA_1: {
			return {
				label: "Production Assistant"
			}
		}

		case USER_ROLE_PA_2: {
			return {
				label: "Production Assistant"
			}
		}

		case USER_ROLE_MAM: {
			return {
				label: "Media Asset Manager"
			}
		}

		case USER_ROLE_MPM: {
			return {
				label: "Media Project Manager"
			}
		}

		case USER_ROLE_MMC: {
			return {
				label: "Media Management Coordinator"
			}
		}

		case USER_ROLE_DOPP: {
			return {
				label: "Director of Post Production & Operations"
			}
		}

		case USER_ROLE_PPC: {
			return {
				label: "Post Production Coordinator"
			}
		}


		default: {
			throw ("No role found for " + role );
		}
	}
}
