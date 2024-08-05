

export const pagination = (Model) => async (request, response, next) => {
    const page = parseInt(request.query.page) || 1;
    const limit = parseInt(request.query.limit) || 10;
    const skip = (page - 1) * limit; // startIndex
    const endIndex = page * limit;
    const requiredId = request.params.id;
    try{
        const results = await Model.findAllWithPagination(limit, skip, requiredId);
        const totalNumberOfResults = await Model.getTotalResults(requiredId);

        const paginationResults = {
            results: results,
            totalNumberOfResults: totalNumberOfResults,
        };

        if(skip > 0) {
            paginationResults.previousPage = page - 1
        }

        if (endIndex < totalNumberOfResults) {
            paginationResults.nextPage = page + 1
        }
            
        request.paginationResults = paginationResults;
        next();
    } catch (error) {
        console.error('Error paginating:', error);
        return response.status(500).json({ message: error.message });
    }
}
