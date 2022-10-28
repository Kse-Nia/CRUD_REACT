import * as Yup from "yup";

let commentSchema = Yup.object().shape({
  text: Yup.string()
    .min(2, "Votre commentaire doit contenir au moins 2 caractères")
    .max(600, "Votre commentaire doit contenir moins de 600 caractères")
    .required("Veuillez rédiger un texte"),
});

export default commentSchema;
