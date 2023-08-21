import * as Yup from 'yup';

export const validationSchema = Yup.object({
  nom: Yup.string().required(' nom est obligatoire').max(20),
  prenom: Yup.string().required(' prenom est obligatoire').max(20),
  telephone: Yup.string().matches(
    /^\d{2}\d{3}\d{3}$/,
    'Invalid phone number format (99-999-999)',
  ),
  dateNaiss: Yup.string(),
  adresse: Yup.string(),

  username: Yup.string()
    .required(' username is Required')
    .min(7, 'username must be at least 7 characters'),
  email: Yup.string().trim().email('Invalid email address'),
  password: Yup.string()
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/,
      'le mot de passe doit avoir des chiffres et des caractères',
    )
    .required('obligatoire'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'ecrivez le mème mot de passe')
    .required('Required'),
});