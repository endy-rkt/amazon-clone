//The url used by the frontend in prod needs to be pushed in
const allowedOrigins=[
	'http://http://localhost:3000/'
];

export const corsOptions ={
	origin:allowedOrigins,
	credential:true,
	optionsSuccessStatus:200
};