const pipelineToTreeData = (pipeline) => {
    const tasks = pipeline.spec.tasks;

    const root = {
        name: pipeline.metadata.name,
        children: tasks.map((task, index) => ({
            name: task.name,
            taskRef: task.taskRef.name,
            index,
        })),
    };

    return root;
};

export default pipelineToTreeData;
