import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

function App() {
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isSentSuccessfully, setIsSentSuccessfully] = useState(false);

	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
		reset,
	} = useForm({
		mode: "onBlur",
	});

	const onSubmit = async (data: any) => {
		try {
			setIsLoading(true);
			setIsSentSuccessfully(false);

			const response = await axios.post(
				"http://localhost:4444/send",
				data,
				{ headers: { "Content-Type": "application/json" } }
			);
			console.log(response);
			setIsSentSuccessfully(true);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}

		reset();
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className="bg-zinc-300 w-full h-screen">
			<form onSubmit={handleSubmit(onSubmit)}>
				<label>
					Full Name:
					<input
						{...register("fullName", {
							required: "Поле обязательно для заполнения",
							minLength: {
								value: 5,
								message: "Минимум 5 символов",
							},
						})}
					/>
				</label>
				<div>
					{errors?.fullName && (
						<p className="text-md text-red-600">
							{errors?.fullName.message || "Error!"}
						</p>
					)}
				</div>

				<div className="flex">
					<label>
						Password
						<input
							{...register("password", {
								required: "Поле обязательно для заполнения",
								minLength: {
									value: 8,
									message: "Минимум 8 символов",
								},
							})}
							type={showPassword ? "text" : "password"} // Toggle the type attribute based on showPassword state
						/>
						<div>
							{errors?.password && (
								<p className="text-md text-red-600">
									{errors?.password.message || "Error!"}
								</p>
							)}
						</div>
					</label>

					<button type="button" onClick={togglePasswordVisibility}>
						{showPassword ? "Hide Password" : "Show Password"}
					</button>
				</div>

				{isLoading ? (
					<p>Loading...</p>
				) : (
					<button type="submit" disabled={!isValid}>
						Submit
					</button>
				)}

				{isSentSuccessfully && (
					<p>Data sent successfully! Everything is fine.</p>
				)}
			</form>
		</div>
	);
}

export default App;
