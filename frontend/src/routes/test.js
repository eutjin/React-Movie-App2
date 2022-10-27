{listTitles.map((title) => (
    <>
      <Card my="md" p="xs" className={classes.card}>
        <Group>
          <div className={classes.content}>
            <Title order={2}>{title.listTitle}</Title>
            <Text size="xs" color="white">
              {list.filter((list) => list.list._id == title._id).length}{" "}
              movies in "{title.listTitle} list
            </Text>
          </div>
          <Button
            onClick={() => handleEditBtn(title)}
            className={styles.deleteButton}
          >
            Edit List
          </Button>
          <Button
            onClick={() => handleDeleteBtn(title._id)}
            className={styles.deleteButton}
          >
            Delete List
          </Button>
          {/* <Button onClick={()=>handleDelCustomList(title._id)}>delete</Button> */}
        </Group>
        <div className={styles.grid}>
          {list
            .filter((list) => list.list._id == title._id)
            .map((list) => (
              <Movie
                key={list.id}
                id={list.id}
                rating={list.rating}
                imgSrc={list.imgSrc}
                title={list.title}
                summary={list.summary}
                genres={list.genres}
                movie={list}
                runtime={list.runtime}
              />
            ))}
        </div>

        <Modal
          size="sm"
          opened={deleteModal}
          onClose={() => setDeleteModal(false)}
          title="Are you sure to delete this list? This action cannot be undone."
        >
          <Center>
            <Group>
              <Button onClick={() => handleDelCustomList()}>Yes</Button>
              <Button onClick={() => setDeleteModal(false)}>No</Button>
            </Group>
          </Center>
        </Modal>
      </Card>
    </>
  ))}