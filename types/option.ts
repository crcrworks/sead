export type Some<T> = {
	hasSome: true
	value: T
}

export type None = {
	hasSome: false
}

export type Option<T> = Some<T> | None
