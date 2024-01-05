const OptionsCard = (props: States) => {
	const { name, occupation, gender, studentGrade, studentClass } = props
	switch (occupation.state) {
		case 'student':
			return (
				<div className='space-y-5'>
					<NameCard {...name} />
					<GenderCard {...gender} />
					<StudentNumberCard />
				</div>
			)

		case 'teacher':
			return (
				<div>
					<NameCard {...name} />
				</div>
			)

		case 'others':
			return <div></div>
	}
}
