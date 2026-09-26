import type { QuizQuestion, ScenarioQuestion, OutputQuestion, DebugChallenge, MistakeQuestion, CodeCompletionQuestion } from '@/types';

export const module14Questions: {
  quickChecks: QuizQuestion[];
  scenarios: ScenarioQuestion[];
  outputs: OutputQuestion[];
  debugs: DebugChallenge[];
  mistakes: MistakeQuestion[];
  codeCompletions: CodeCompletionQuestion[];
} = {
  quickChecks: [
    {
      id: 'm14-quiz-001', type: 'mcq', question: 'What is a lambda expression in Java?',
      options: ['A Greek letter', 'Anonymous function that provides implementation for a functional interface', 'A type of variable', 'A loop construct'],
      correctAnswer: 'Anonymous function that provides implementation for a functional interface',
      explanation: 'Lambda is an anonymous (unnamed) function that implements a functional interface (interface with one abstract method). It enables concise code.',
      romanUrduExplanation: 'Lambda ek anonymous (bina naam ka) function hai jo functional interface implement karta hai. Ye concise code enable karta hai.',
      difficulty: 'easy', topicTags: ['lambda', 'functional-interface'], xpReward: 25, moduleId: 'module-14',
    },
    {
      id: 'm14-quiz-002', type: 'mcq', question: 'What is a functional interface?',
      options: ['Any interface', 'An interface with exactly one abstract method', 'An interface with no methods', 'An interface with only default methods'],
      correctAnswer: 'An interface with exactly one abstract method',
      explanation: 'Functional interface has exactly one abstract method (SAM - Single Abstract Method). @FunctionalInterface annotation is optional but recommended.',
      romanUrduExplanation: 'Functional interface exactly ek abstract method rakhta hai (SAM - Single Abstract Method). @FunctionalInterface annotation optional hai lekin recommended hai.',
      difficulty: 'medium', topicTags: ['functional-interface', 'lambda'], xpReward: 30, moduleId: 'module-14',
    },
    {
      id: 'm14-quiz-003', type: 'mcq', question: 'What does the Stream API provide?',
      options: ['File streaming', 'Declarative operations on collections (filter, map, reduce)', 'Network streaming', 'Video playback'],
      correctAnswer: 'Declarative operations on collections (filter, map, reduce)',
      explanation: 'Stream API enables functional-style operations on collections. Supports filter, map, reduce, collect, sort, and other operations without modifying the source.',
      romanUrduExplanation: 'Stream API collections par functional-style operations enable karta hai. Filter, map, reduce, collect, sort support karta hai without modifying source.',
      difficulty: 'medium', topicTags: ['stream-api', 'functional-programming'], xpReward: 30, moduleId: 'module-14',
    },
    {
      id: 'm14-quiz-004', type: 'mcq', question: 'What is the difference between map() and flatMap() in Stream?',
      options: ['No difference', 'map transforms each element, flatMap flattens nested structures into a single stream', 'map is faster', 'flatMap creates new objects'],
      correctAnswer: 'map transforms each element, flatMap flattens nested structures into a single stream',
      explanation: 'map() transforms each element independently. flatMap() transforms each element into a stream and flattens all streams into one.',
      romanUrduExplanation: 'map() har element ko independently transform karta hai. flatMap() har element ko stream mein transform karta hai aur sab streams ko ek mein flatten karta hai.',
      difficulty: 'hard', topicTags: ['stream-api', 'map', 'flatmap'], xpReward: 35, moduleId: 'module-14',
    },
    {
      id: 'm14-quiz-005', type: 'mcq', question: 'What is method reference in Java?',
      options: ['Calling a method', 'Shorthand notation for a lambda that calls an existing method', 'A type of annotation', 'A method parameter'],
      correctAnswer: 'Shorthand notation for a lambda that calls an existing method',
      explanation: 'Method reference (::) is shorthand for lambda. Example: String::length is equivalent to s -> s.length(). Four types: static, instance, arbitrary object, constructor.',
      romanUrduExplanation: 'Method reference (::) lambda ka shorthand hai. Example: String::length equivalent hai s -> s.length().',
      difficulty: 'medium', topicTags: ['method-reference', 'lambda'], xpReward: 30, moduleId: 'module-14',
    },
    {
      id: 'm14-quiz-006', type: 'mcq', question: 'What is Optional in Java?',
      options: ['An optional parameter', 'A container that may or may not hold a non-null value, preventing NullPointerException', 'A type of collection', 'An optional method'],
      correctAnswer: 'A container that may or may not hold a non-null value, preventing NullPointerException',
      explanation: 'Optional<T> wraps a value that might be null. It provides methods like isPresent(), orElse(), map() to handle absence gracefully without null checks.',
      romanUrduExplanation: 'Optional<T> value wrap karta hai jo null ho sakta hai. IsPresent(), orElse(), map() jaise methods null checks ke bina gracefully handle karte hain.',
      difficulty: 'medium', topicTags: ['optional', 'null-safety'], xpReward: 30, moduleId: 'module-14',
    },
    {
      id: 'm14-quiz-007', type: 'true-false', question: 'Streams are lazy - intermediate operations are not executed until a terminal operation is invoked.',
      correctAnswer: 'True',
      explanation: 'Stream operations are lazy. filter(), map(), etc. create a pipeline but do not execute until a terminal operation like collect(), forEach(), or reduce() is called.',
      romanUrduExplanation: 'Stream operations lazy hain. filter(), map(), etc. pipeline banate hain lekin tab tak execute nahi hota jab tak collect(), forEach(), ya reduce() call na ho.',
      difficulty: 'medium', topicTags: ['stream-api', 'laziness'], xpReward: 25, moduleId: 'module-14',
    },
    {
      id: 'm14-quiz-008', type: 'mcq', question: 'Which is a terminal operation in Stream?',
      options: ['filter()', 'map()', 'collect()', 'flatMap()'],
      correctAnswer: 'collect()',
      explanation: 'collect() is a terminal operation that triggers processing of the stream pipeline. Intermediate operations (filter, map, flatMap) are lazy.',
      romanUrduExplanation: 'collect() ek terminal operation hai jo stream pipeline ki processing trigger karta hai. Intermediate operations (filter, map, flatMap) lazy hain.',
      difficulty: 'easy', topicTags: ['stream-api', 'terminal-operations'], xpReward: 25, moduleId: 'module-14',
    },
    {
      id: 'm14-quiz-009', type: 'mcq', question: 'What is the Predicate<T> functional interface?',
      options: ['A method that returns void', 'A function that takes T and returns boolean', 'A function that takes no arguments', 'A function that takes two arguments'],
      correctAnswer: 'A function that takes T and returns boolean',
      explanation: 'Predicate<T> is a functional interface: boolean test(T t). Used for filtering: list.stream().filter(s -> s.length() > 5).',
      romanUrduExplanation: 'Predicate<T> ek functional interface hai: boolean test(T t). Filtering ke liye use hota hai: list.stream().filter(s -> s.length() > 5).',
      difficulty: 'medium', topicTags: ['predicate', 'functional-interface'], xpReward: 30, moduleId: 'module-14',
    },
    {
      id: 'm14-quiz-010', type: 'mcq', question: 'What is the Consumer<T> functional interface?',
      options: ['Returns a value', 'Takes T and returns nothing (void)', 'Takes no arguments', 'Takes two arguments and returns boolean'],
      correctAnswer: 'Takes T and returns nothing (void)',
      explanation: 'Consumer<T> is a functional interface: void accept(T t). Used for side effects: list.forEach(item -> System.out.println(item)).',
      romanUrduExplanation: 'Consumer<T> ek functional interface hai: void accept(T t). Side effects ke liye use hota hai: list.forEach(item -> System.out.println(item)).',
      difficulty: 'medium', topicTags: ['consumer', 'functional-interface'], xpReward: 30, moduleId: 'module-14',
    },
  ],
  scenarios: [
    {
      id: 'm14-sq-001', title: 'Data Processing Pipeline',
      scenario: 'You have a list of User objects. You need to: filter active users, extract their emails, sort alphabetically, and collect into a list.',
      question: 'Which approach is most idiomatic?',
      type: 'concept-application',
      options: [
        'For loop with if statements',
        'Stream with filter().map().sorted().collect()',
        'Multiple for loops',
        'Recursive approach',
      ],
      correctAnswer: 'Stream with filter().map().sorted().collect()',
      explanation: 'Stream pipeline is declarative and readable: users.stream().filter(User::isActive).map(User::getEmail).sorted().collect(Collectors.toList()).',
      romanUrduExplanation: 'Stream pipeline declarative aur readable hai: users.stream().filter(User::isActive).map(User::getEmail).sorted().collect(Collectors.toList()).',
      relatedConcepts: ['stream-api', 'functional-programming', 'declarative'], difficulty: 'medium',
    },
  ],
  outputs: [
    {
      id: 'm14-oq-001', lessonId: 'lesson-14-01',
      code: `import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Ali", "Sara", "Ahmed", "Zara");
        String result = names.stream()
            .filter(n -> n.length() > 3)
            .map(String::toUpperCase)
            .sorted()
            .collect(Collectors.joining(", "));
        System.out.println(result);
    }
}`,
      options: ['AHMED, ALI, ZARA', 'ALI, AHMED, ZARA', 'SARA, AHMED, ZARA', 'AHMED, ZARA, ALI'],
      correctOutput: 'AHMED, ALI, ZARA',
      explanation: 'filter: "Ali"(3) excluded, rest pass. map: AHMED, SARA, ZARA. sorted: AHMED, ALI, ZARA. join: "AHMED, ALI, ZARA".',
      romanUrduExplanation: 'filter: "Ali"(3) excluded, baaki pass. map: AHMED, SARA, ZARA. sorted: AHMED, ALI, ZARA. join: "AHMED, ALI, ZARA".',
      conceptTested: ['stream-api', 'filter', 'map', 'collect'], difficulty: 'medium',
    },
  ],
  debugs: [
    {
      id: 'm14-dc-001', title: 'Modifying Collection During Stream',
      description: 'Modifying the source collection during stream operations causes ConcurrentModificationException.',
      buggyCode: `import java.util.*;
import java.util.stream.*;

public class UserFilter {
    public List<String> filterActive(List<String> users) {
        List<String> result = new ArrayList<>();
        users.stream()
            .filter(u -> {
                users.remove(u); // Modifying source!
                return u.startsWith("active_");
            })
            .forEach(result::add);
        return result;
    }
}`,
      expectedBehavior: 'Should filter active users without modifying the source collection.',
      hints: ['Never modify the source collection during stream operations', 'Use collect to build a new collection', 'Streams should not have side effects on their source'],
      solution: `import java.util.*;
import java.util.stream.*;

public class UserFilter {
    public List<String> filterActive(List<String> users) {
        return users.stream()
            .filter(u -> u.startsWith("active_"))
            .collect(Collectors.toList());
    }
}`,
      explanation: 'Streams should be side-effect-free. Collect results into a new collection instead of modifying the source.',
      romanUrduExplanation: 'Streams side-effect-free hone chahiye. Source modify karne ki jagah naye collection mein collect karo.',
      difficulty: 'medium', topicTags: ['stream-api', 'side-effects', 'concurrent-modification'], xpReward: 60,
      errorMessage: 'ConcurrentModificationException', errorType: 'runtime', conceptTested: ['stream-api', 'side-effects'],
    },
  ],
  mistakes: [
    {
      id: 'm14-mq-001', title: 'Not Using Method Reference',
      code: `list.stream()
    .map(s -> s.toUpperCase())     // Lambda
    .filter(s -> s.startsWith("A"))
    .forEach(s -> System.out.println(s));`,
      mistakeDescription: 'Lambda that only calls an existing method can be replaced with method reference for cleaner code.',
      possibleMistakes: ['Not knowing method reference syntax', 'Using verbose lambdas everywhere', 'Missing readability improvements'],
      correctMistake: 'Use method reference :: when lambda just calls an existing method.',
      correction: `list.stream()
    .map(String::toUpperCase)       // Method reference
    .filter(s -> s.startsWith("A"))
    .forEach(System.out::println);`,
      explanation: 'Method references are more concise than lambdas when the lambda body just calls an existing method.',
      romanUrduExplanation: 'Method references lambdas se concise hain jab lambda body sirf ek existing method call karta hai.',
      difficulty: 'easy', conceptTested: ['method-reference', 'lambda', 'readability'],
    },
  ],
  codeCompletions: [
    {
      id: 'm14-cc-001', lessonId: 'lesson-14-01',
      codeTemplate: `import java.util.*;
import java.util.stream.*;

public class StringProcessor {
    // TODO: Return uppercase strings longer than 3 characters
    public static List<String> process(List<String> input) {
        ____________
    }
}`,
      blank: 'return input.stream().filter(s -> s.length() > 3).map(String::toUpperCase).collect(Collectors.toList());',
      acceptedAnswers: [
        'return input.stream().filter(s -> s.length() > 3).map(String::toUpperCase).collect(Collectors.toList());',
        'return input.stream().filter(s -> s.length() > 3).map(s -> s.toUpperCase()).collect(Collectors.toList());',
      ],
      explanation: 'Stream pipeline: filter by length, map to uppercase, collect to list.',
      romanUrduExplanation: 'Stream pipeline: length se filter, uppercase mein map, list mein collect.',
      hints: ['Use stream() to create a stream', 'filter() with length check', 'map() with String::toUpperCase', 'collect(Collectors.toList())'],
      difficulty: 'medium', conceptTested: ['stream-api', 'filter', 'map', 'collect'],
    },
  ],
};
