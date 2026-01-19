import DashboardController from './DashboardController'
import EmployeeController from './EmployeeController'
import ShiftController from './ShiftController'
import AssignmentController from './AssignmentController'

const Web = {
    DashboardController: Object.assign(DashboardController, DashboardController),
    EmployeeController: Object.assign(EmployeeController, EmployeeController),
    ShiftController: Object.assign(ShiftController, ShiftController),
    AssignmentController: Object.assign(AssignmentController, AssignmentController),
}

export default Web