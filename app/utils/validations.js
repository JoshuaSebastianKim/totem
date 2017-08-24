export const required = value => (value ? undefined : 'Campo obligatorio');

export const minLength = min => value => (
	value && value.length < min
	? `Debe tener al menos ${min} caracteres`
	: undefined
);

export const minLength8 = minLength(8);

export const isEmail = value => (
	value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Email inválido'
    : undefined
);

export const isNumber = value => (
	value && isNaN(Number(value))
	? 'Número inválido'
	: undefined
);
