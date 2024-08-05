package com.ssafy.BOSS.fixture;

import com.ssafy.BOSS.domain.Department;
import com.ssafy.BOSS.domain.Member;
import com.ssafy.BOSS.domain.Position;
import com.ssafy.BOSS.repository.DepartmentRepository;
import com.ssafy.BOSS.repository.MemberRepository;
import com.ssafy.BOSS.repository.PositionRepository;
import org.springframework.stereotype.Service;

@Service
public class MemberFixtureService {

    public MemberFixtureService(MemberRepository memberRepository, DepartmentRepository departmentRepository, PositionRepository positionRepository) {
        this.departmentRepository = departmentRepository;
        this.memberRepository = memberRepository;
        this.positionRepository = positionRepository;
    }

    private final MemberRepository memberRepository;
    private final DepartmentRepository departmentRepository;
    private final PositionRepository positionRepository;

    public Member getMember() {
        Department department = new Department();
        department.setDepartmentName("test");
        departmentRepository.save(department);

        Position position = new Position();
        position.setPositionName("test");
        positionRepository.save(position);

        Member member = new Member();
        member.setName("ssafy");
        member.setDepartment(department);
        member.setPosition(position);
        memberRepository.save(member);

        return member;
    }

    public void deleteAll() {
        memberRepository.deleteAllInBatch();
        positionRepository.deleteAllInBatch();
        departmentRepository.deleteAllInBatch();
    }

}
