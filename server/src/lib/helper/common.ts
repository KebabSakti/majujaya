export async function delay(value: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, value));
}

export function toModel<T extends Record<string, any>>(
  object: Record<string, any>
): T {
  let model: T = {} as T;

  for (const [key, value] of Object.entries(object)) {
    model = { ...model, [key]: value };
  }

  return model;
}

export function invoice(): string {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const year = String(currentDate.getFullYear()).slice(-2); // Get last two digits of the year
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  const prefix = "INV";
  const dateString = day + month + year + hours + minutes + seconds;

  const randomDigits = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit number

  return prefix + dateString + randomDigits;
}
