const { app } = require('@azure/functions');

app.http('CAzure-API', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        // Fix query parameter handling
        const name = request.query.get("Name") || request.query.get("name") || "world";

        // Fix request body handling
        let bodyName = "";
        try {
            const body = await request.json(); // Handle JSON body
            bodyName = body.name || body.Name || "";
        } catch (error) {
            context.log("No valid JSON body found.");
        }

        const finalName = bodyName || name; // Use body name if available

        return { body: `Hello, ${finalName}!` };
    }
});

if (!process.env.NODE_VERSION) {
    console.error("NODE_VERSION is not defined in environment variables!");
} else {
    console.log(`Running on Node.js ${process.env.NODE_VERSION}`);
}


