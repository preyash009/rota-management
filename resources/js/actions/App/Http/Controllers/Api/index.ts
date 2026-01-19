import EmployeeController from './EmployeeController'
import ShiftController from './ShiftController'
import AssignmentController from './AssignmentController'
import DashboardController from './DashboardController'

const Api = {
    EmployeeController: Object.assign(EmployeeController, EmployeeController),
    ShiftController: Object.assign(ShiftController, ShiftController),
    AssignmentController: Object.assign(AssignmentController, AssignmentController),
    DashboardController: Object.assign(DashboardController, DashboardController),
}

export default Api