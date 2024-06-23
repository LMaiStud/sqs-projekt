package com.sqs_maier;

import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import com.tngtech.archunit.core.domain.JavaClasses;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.classes;
import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchitectureTests {

    private final JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("com.sqs_maier");

    @Test
    void servicesShouldOnlyBeAccessedByControllersOrOtherServices() {
        classes()
                .that().resideInAPackage("..service..")
                .should().onlyBeAccessed().byAnyPackage("..controller..", "..service..")
                .check(importedClasses);
    }

    @Test
    void controllersShouldOnlyCallServices() {
        classes()
                .that().resideInAPackage("..controller..")
                .should().onlyAccessClassesThat()
                .resideInAnyPackage("..service..","..controller..", "java..", "javax..", "..util..", "..http..")
                .check(importedClasses);
    }

    @Test
    void servicesShouldNotDependOnRepositoriesInOtherModules() {
        classes()
                .that().resideInAPackage("..service..")
                .should().onlyDependOnClassesThat()
                .resideInAnyPackage("..service..", "..springframework..", "..repository..", "java..", "javax..", "..util..", "..model..", "..http..")
                .check(importedClasses);
    }

    @Test
    void noCyclicDependenciesBetweenPackages() {
        noClasses()
                .should().dependOnClassesThat()
                .resideInAPackage("..controller..")
                .andShould().dependOnClassesThat()
                .resideInAPackage("..service..")
                .andShould().dependOnClassesThat()
                .resideInAPackage("..repository..")
                .check(importedClasses);
    }

}
