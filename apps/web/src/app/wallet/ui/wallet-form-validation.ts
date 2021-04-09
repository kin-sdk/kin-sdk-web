import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { WalletAddType } from '../data-access'

const validateName = yup.string().required().max(50)
const validatePublicKey = yup.string().required().min(44).max(44)
const validateSecret = yup.string().required().min(56).max(56)

export function getValidationSchema(type: WalletAddType) {
  switch (type) {
    case 'create':
      return yup.object().shape({
        name: validateName,
      })
    case 'import':
      return yup.object().shape({
        name: validateName,
        secret: validateSecret,
      })
    case 'watch':
      return yup.object().shape({
        name: validateName,
        publicKey: validatePublicKey,
      })
  }
}

export function getWalletResolver(type: WalletAddType) {
  return yupResolver(getValidationSchema(type))
}

export interface WalletAddFormInputs {
  name: string
  publicKey?: string
  secret?: string
}
