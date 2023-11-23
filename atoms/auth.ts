import { atom } from 'jotai'

import { AuthUserData, AuthSession } from '@/types/auth'

export const authUserDataAtom = atom<AuthUserData>(null)
export const authIsLoadingAtom = atom<boolean>(false)
export const authSessionAtom = atom<AuthSession>(null)
