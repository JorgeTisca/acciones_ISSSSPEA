import {
  FieldErrors,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";

//UseFormRegister<FieldValues>
interface Props {
  id?: string;
  value?: string;
  name?: string;
  readonly?: boolean;
  labelledby?: string;
  minLength?: number;
  placeholder?: string;
  maxLength?: number;
  label: string;
  min?: string;
  max?: string;
  className?: string;
  type?: string;
  style?: any;
  autoComplete?: string;
  useFormRegister?: {
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
    options?: RegisterOptions<FieldValues, string> | undefined;
  };
}

// INPUT STRING
export const InputMaterial = ({
  id,
  value,
  name,
  readonly,
  placeholder,
  min,
  max,
  label,
  className,
  type = "text",
  useFormRegister,
  autoComplete = "off",
  style = {},
}: Props) => {
  return (
    <div
      className={`relative  min-w-[200px] h-10 
      ${className} 
      ${useFormRegister?.errors[label]?.type === "required" && "mb-4"}
      ${useFormRegister?.errors[label] && "mb-4"}
      `}
    >
      <input
        id={id}
        name={name}
        value={value}
        readOnly={readonly}
        min={min}
        max={max}
        autoComplete={autoComplete}
        type={type}
        style={style}

        className={`${type == "date" && " rounded-[7px]"
          } peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2   border-t-transparent border-r-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-gray-800  focus:border-blue-500 ${useFormRegister?.errors[label]?.type === "required" &&
          "border-red-500 focus:border-red-500 "
          }
        ${useFormRegister?.errors[label] &&
          "border-red-500 focus:border-red-500 "
          }`}
        placeholder={placeholder}
        {...useFormRegister?.register(label, useFormRegister?.options)}
        aria-invalid={useFormRegister?.errors[label] ? "true" : "false"}
      />

      <label
        className={`${className} flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 ${useFormRegister?.errors[label]?.type === "required" &&
          " peer-placeholder-shown:text-red-500 "
          } ${useFormRegister?.errors.CURP &&
          " peer-placeholder-shown:text-red-500  "
          } leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 after:border-blue-gray-200 peer-focus:after:!border-blue-500 ${useFormRegister?.errors[label]?.type === "required" &&
          "peer-focus:text-red-500 before:border-blue-gray-200 peer-focus:before:!border-red-500 after:border-blue-red-200 peer-focus:after:!border-red-500 "
          }
        ${useFormRegister?.errors[label] &&
          "peer-focus:text-red-500 before:border-blue-gray-200 peer-focus:before:!border-red-500 after:border-blue-red-200 peer-focus:after:!border-red-500  "
          }`}
      >
        {label}
      </label>

      {useFormRegister?.errors[label]?.type === "required" && (
        <p className=" text-red-500 text-sm" role="alert">
          {label} ES REQUERIDO
        </p>
      )}

      {useFormRegister?.errors[label] && (
        <p className=" text-red-500 text-sm" role="alert">
          {useFormRegister?.errors[label]?.message?.toString()}
        </p>
      )}
    </div>
  );
};

// INPUT NUMBER
export const InputMaterialNumber = ({
  minLength,
  maxLength,
  min,
  max,
  placeholder,
  label,
  className,
  type = "text",
  useFormRegister,
  autoComplete = "off",
}: Props) => {
  return (
    <div
      className={`relative  min-w-[200px] h-10 
    ${className} 
    ${useFormRegister?.errors[label]?.type === "required" && "mb-4"}
    ${useFormRegister?.errors[label] && "mb-4"}
    `}
    >
      <input
        minLength={minLength}
        maxLength={maxLength}
        type="number"
        min={min}
        max={max}
        className={`${type == "date" && "border-t-transparent rounded-[7px]"
          } peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2   border-t-transparent border-r-transparent focus:border-t-transparent text-base px-3 py-2.5 rounded-[7px] border-gray-800  focus:border-blue-500 ${useFormRegister?.errors[label]?.type === "required" &&
          "border-red-500 focus:border-red-500 "
          }
        ${useFormRegister?.errors[label] &&
          "border-red-500 focus:border-red-500 "
          }`}
        placeholder={placeholder}
        {...useFormRegister?.register(label, useFormRegister?.options)}
        aria-invalid={useFormRegister?.errors[label] ? "true" : "false"}
      />

      <label
        className={`${className} flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 ${useFormRegister?.errors[label]?.type === "required" &&
          " peer-placeholder-shown:text-red-500 "
          } ${useFormRegister?.errors.CURP &&
          " peer-placeholder-shown:text-red-500  "
          } leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent  text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 after:border-blue-gray-200 peer-focus:after:!border-blue-500 ${useFormRegister?.errors[label]?.type === "required" &&
          "peer-focus:text-red-500 before:border-blue-gray-200 peer-focus:before:!border-red-500 after:border-blue-red-200 peer-focus:after:!border-red-500 "
          }
        ${useFormRegister?.errors[label] &&
          "peer-focus:text-red-500 before:border-blue-gray-200 peer-focus:before:!border-red-500 after:border-blue-red-200 peer-focus:after:!border-red-500  "
          }`}
      >
        {label}
      </label>

      {useFormRegister?.errors[label]?.type === "required" && (
        <p className=" text-red-500 text-sm" role="alert">
          {label} ES REQUERIDO
        </p>
      )}

      {useFormRegister?.errors[label] && (
        <p className=" text-red-500 text-sm" role="alert">
          {useFormRegister?.errors[label]?.message?.toString()}
        </p>
      )}
    </div>
  );
};

// INPUT MONEDA
const defaultMaskOptions = {
  prefix: "$",
  suffix: "",
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ",",
  allowDecimal: true,
  decimalSymbol: ".",
  decimalLimit: 2, // how many digits allowed after the decimal
  integerLimit: 10, // limit length of integer numbers
  allowNegative: false,
  allowLeadingZeroes: false,
};

export const InputMaterialMoneda = ({
  placeholder,
  label,
  className,
  type = "text",
  useFormRegister,
  autoComplete = "off",
}: Props) => {
  const currencyMask = createNumberMask({
    ...defaultMaskOptions,
  });
  return (
    <div
      className={`relative  min-w-[200px] h-10 
    ${className} 
    ${useFormRegister?.errors[label]?.type === "required" && "mb-4"}
    ${useFormRegister?.errors[label] && "mb-4"}
    `}
    >
      <MaskedInput
        name={label}
        mask={currencyMask}
        min="0"
        max="1000000000"
        className={`${type == "date" && "border-t-transparent rounded-[7px]"
          } peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2   border-t-transparent border-r-transparent focus:border-t-transparent text-base px-3 py-2.5 rounded-[7px] border-gray-800  focus:border-blue-500 ${useFormRegister?.errors[label]?.type === "required" &&
          "border-red-500 focus:border-red-500 "
          }
        ${useFormRegister?.errors[label] &&
          "border-red-500 focus:border-red-500 "
          }`}
        placeholder={placeholder}
        {...useFormRegister?.register(label, useFormRegister?.options)}
        aria-invalid={useFormRegister?.errors[label] ? "true" : "false"}
      />

      <label
        className={`${className} flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 ${useFormRegister?.errors[label]?.type === "required" &&
          " peer-placeholder-shown:text-red-500 "
          } ${useFormRegister?.errors.CURP &&
          " peer-placeholder-shown:text-red-500  "
          } leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent  text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 after:border-blue-gray-200 peer-focus:after:!border-blue-500 ${useFormRegister?.errors[label]?.type === "required" &&
          "peer-focus:text-red-500 before:border-blue-gray-200 peer-focus:before:!border-red-500 after:border-blue-red-200 peer-focus:after:!border-red-500 "
          }
        ${useFormRegister?.errors[label] &&
          "peer-focus:text-red-500 before:border-blue-gray-200 peer-focus:before:!border-red-500 after:border-blue-red-200 peer-focus:after:!border-red-500  "
          }`}
      >
        {label}
      </label>

      {useFormRegister?.errors[label]?.type === "required" && (
        <p className=" text-red-500 text-sm" role="alert">
          {label} ES REQUERIDO
        </p>
      )}

      {useFormRegister?.errors[label] && (
        <p className=" text-red-500 text-sm" role="alert">
          {useFormRegister?.errors[label]?.message?.toString()}
        </p>
      )}
    </div>
  );
};
