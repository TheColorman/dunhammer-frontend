import styles from "./alert.module.css"

type AlertOptions = {
  type?: "success" | "info" | "warning" | "error"
  name?: string
  message: string
  onClick?: () => void
}

const colors = {
  text: {
    success: "text-green-100",
    info: "text-blue-100",
    warning: "text-orange-100",
    error: "text-red-100"
  },
  bg: {
    foreground: {
      success: "bg-green-500/75",
      info: "bg-blue-500/75",
      warning: "bg-orange-500/75",
      error: "bg-red-500/75"
    },
    background: {
      success: "bg-green-800/75",
      info: "bg-blue-800/75",
      warning: "bg-orange-800/75",
      error: "bg-red-800/75"
    },
    blur: {
      success: "supports-backdrop-blur:bg-green-800/75",
      info: "supports-backdrop-blur:bg-blue-800/75",
      warning: "supports-backdrop-blur:bg-orange-800/75",
      error: "supports-backdrop-blur:bg-red-800/75"
    }
  }
}

export default function Alert({ type = "info", name, message, onClick }: AlertOptions) {

  return (
    <div
      className={`fixed inset-x-0 p-4 bottom-0 ${styles.alert} ${onClick ? "hover:cursor-pointer" : ""}`}
      onClick={onClick}
    >
      <div className="text-center py-4 lg:px-4">
        <div
          className={`p-2 items-center leading-none rounded-full flex lg:inline-flex backdrop-blur-sm ${colors.text[type]} ${colors.bg.background[type]}`}
          role="alert"
        >
          {name && (
            <span className={`flex rounded-full ${colors.bg.foreground[type]} uppercase px-2 py-1 text-xs font-bold mr-3`}>
              {name}
            </span>
          )}
          <span className="font-semibold mr-2 text-left flex-auto">
            {message}
          </span>
          {onClick && (
            <svg
              className="fill-current opacity-75 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              >
              <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
