import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateClientId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export function getClientId(): string {
  let clientId = localStorage.getItem('clientId')
  if (!clientId) {
    clientId = generateClientId()
    localStorage.setItem('clientId', clientId)
  }
  return clientId
}

export function getUsername(): string | null {
  return localStorage.getItem('username')
}

export function setUsername(username: string): void {
  localStorage.setItem('username', username)
}

export function getUserId(): string | null {
  return localStorage.getItem('userId')
}

export function setUserId(userId: string): void {
  localStorage.setItem('userId', userId)
}
