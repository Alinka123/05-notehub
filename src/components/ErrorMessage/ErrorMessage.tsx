import css from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage({
  message = "Something went wrong.",
}: ErrorMessageProps) {
  return <div className={css.error}>{message}</div>;
}
