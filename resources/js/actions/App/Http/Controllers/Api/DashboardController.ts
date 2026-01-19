import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\DashboardController::getRotaByWeek
* @see app/Http/Controllers/Api/DashboardController.php:32
* @route '/api/dashboard/rota/week'
*/
export const getRotaByWeek = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRotaByWeek.url(options),
    method: 'get',
})

getRotaByWeek.definition = {
    methods: ["get","head"],
    url: '/api/dashboard/rota/week',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\DashboardController::getRotaByWeek
* @see app/Http/Controllers/Api/DashboardController.php:32
* @route '/api/dashboard/rota/week'
*/
getRotaByWeek.url = (options?: RouteQueryOptions) => {
    return getRotaByWeek.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\DashboardController::getRotaByWeek
* @see app/Http/Controllers/Api/DashboardController.php:32
* @route '/api/dashboard/rota/week'
*/
getRotaByWeek.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRotaByWeek.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\DashboardController::getRotaByWeek
* @see app/Http/Controllers/Api/DashboardController.php:32
* @route '/api/dashboard/rota/week'
*/
getRotaByWeek.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getRotaByWeek.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\DashboardController::getRotaByWeek
* @see app/Http/Controllers/Api/DashboardController.php:32
* @route '/api/dashboard/rota/week'
*/
const getRotaByWeekForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getRotaByWeek.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\DashboardController::getRotaByWeek
* @see app/Http/Controllers/Api/DashboardController.php:32
* @route '/api/dashboard/rota/week'
*/
getRotaByWeekForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getRotaByWeek.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\DashboardController::getRotaByWeek
* @see app/Http/Controllers/Api/DashboardController.php:32
* @route '/api/dashboard/rota/week'
*/
getRotaByWeekForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getRotaByWeek.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getRotaByWeek.form = getRotaByWeekForm

/**
* @see \App\Http\Controllers\Api\DashboardController::getRotaByDate
* @see app/Http/Controllers/Api/DashboardController.php:47
* @route '/api/dashboard/rota/date'
*/
export const getRotaByDate = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRotaByDate.url(options),
    method: 'get',
})

getRotaByDate.definition = {
    methods: ["get","head"],
    url: '/api/dashboard/rota/date',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\DashboardController::getRotaByDate
* @see app/Http/Controllers/Api/DashboardController.php:47
* @route '/api/dashboard/rota/date'
*/
getRotaByDate.url = (options?: RouteQueryOptions) => {
    return getRotaByDate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\DashboardController::getRotaByDate
* @see app/Http/Controllers/Api/DashboardController.php:47
* @route '/api/dashboard/rota/date'
*/
getRotaByDate.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRotaByDate.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\DashboardController::getRotaByDate
* @see app/Http/Controllers/Api/DashboardController.php:47
* @route '/api/dashboard/rota/date'
*/
getRotaByDate.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getRotaByDate.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\DashboardController::getRotaByDate
* @see app/Http/Controllers/Api/DashboardController.php:47
* @route '/api/dashboard/rota/date'
*/
const getRotaByDateForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getRotaByDate.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\DashboardController::getRotaByDate
* @see app/Http/Controllers/Api/DashboardController.php:47
* @route '/api/dashboard/rota/date'
*/
getRotaByDateForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getRotaByDate.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\DashboardController::getRotaByDate
* @see app/Http/Controllers/Api/DashboardController.php:47
* @route '/api/dashboard/rota/date'
*/
getRotaByDateForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getRotaByDate.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getRotaByDate.form = getRotaByDateForm

/**
* @see \App\Http\Controllers\Api\DashboardController::getEmployeeStats
* @see app/Http/Controllers/Api/DashboardController.php:58
* @route '/api/dashboard/employee-stats'
*/
export const getEmployeeStats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getEmployeeStats.url(options),
    method: 'get',
})

getEmployeeStats.definition = {
    methods: ["get","head"],
    url: '/api/dashboard/employee-stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\DashboardController::getEmployeeStats
* @see app/Http/Controllers/Api/DashboardController.php:58
* @route '/api/dashboard/employee-stats'
*/
getEmployeeStats.url = (options?: RouteQueryOptions) => {
    return getEmployeeStats.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\DashboardController::getEmployeeStats
* @see app/Http/Controllers/Api/DashboardController.php:58
* @route '/api/dashboard/employee-stats'
*/
getEmployeeStats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getEmployeeStats.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\DashboardController::getEmployeeStats
* @see app/Http/Controllers/Api/DashboardController.php:58
* @route '/api/dashboard/employee-stats'
*/
getEmployeeStats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getEmployeeStats.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\DashboardController::getEmployeeStats
* @see app/Http/Controllers/Api/DashboardController.php:58
* @route '/api/dashboard/employee-stats'
*/
const getEmployeeStatsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getEmployeeStats.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\DashboardController::getEmployeeStats
* @see app/Http/Controllers/Api/DashboardController.php:58
* @route '/api/dashboard/employee-stats'
*/
getEmployeeStatsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getEmployeeStats.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\DashboardController::getEmployeeStats
* @see app/Http/Controllers/Api/DashboardController.php:58
* @route '/api/dashboard/employee-stats'
*/
getEmployeeStatsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getEmployeeStats.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getEmployeeStats.form = getEmployeeStatsForm

/**
* @see \App\Http\Controllers\Api\DashboardController::getShiftStats
* @see app/Http/Controllers/Api/DashboardController.php:83
* @route '/api/dashboard/shift-stats'
*/
export const getShiftStats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getShiftStats.url(options),
    method: 'get',
})

getShiftStats.definition = {
    methods: ["get","head"],
    url: '/api/dashboard/shift-stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\DashboardController::getShiftStats
* @see app/Http/Controllers/Api/DashboardController.php:83
* @route '/api/dashboard/shift-stats'
*/
getShiftStats.url = (options?: RouteQueryOptions) => {
    return getShiftStats.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\DashboardController::getShiftStats
* @see app/Http/Controllers/Api/DashboardController.php:83
* @route '/api/dashboard/shift-stats'
*/
getShiftStats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getShiftStats.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\DashboardController::getShiftStats
* @see app/Http/Controllers/Api/DashboardController.php:83
* @route '/api/dashboard/shift-stats'
*/
getShiftStats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getShiftStats.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\DashboardController::getShiftStats
* @see app/Http/Controllers/Api/DashboardController.php:83
* @route '/api/dashboard/shift-stats'
*/
const getShiftStatsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getShiftStats.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\DashboardController::getShiftStats
* @see app/Http/Controllers/Api/DashboardController.php:83
* @route '/api/dashboard/shift-stats'
*/
getShiftStatsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getShiftStats.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\DashboardController::getShiftStats
* @see app/Http/Controllers/Api/DashboardController.php:83
* @route '/api/dashboard/shift-stats'
*/
getShiftStatsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getShiftStats.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getShiftStats.form = getShiftStatsForm

const DashboardController = { getRotaByWeek, getRotaByDate, getEmployeeStats, getShiftStats }

export default DashboardController