package bondchu.h2spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import bondchu.h2spring.model.Employee;
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long>{

}
